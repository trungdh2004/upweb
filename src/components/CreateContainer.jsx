import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney } from 'react-icons/md';
import { categories } from '../utils/data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { saveItem } from '../utils/firebaseFunction';
import { getAllFoodItems } from '../utils/firebaseFunction';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const CreateContainer = () => {
    const [title, setTitle] = useState('');
    const [calories, setCalories] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [fields, setFields] = useState(false);
    const [alertStatus, setAlertStatus] = useState('danger');
    const [msg, setMsg] = useState(null);
    const [isLoading, setisLoading] = useState(false);
    const [{ foodItems }, dispatch] = useStateValue();

    const fetchData = async () => {
        await getAllFoodItems().then((data) => {
            dispatch({
                type: actionType.SET_FOOD_ITEMS,
                foodItems: data,
            });
        });
    };

    const uploadImage = async (e) => {
        setisLoading(true);
        const imageFile = e.target.files[0];
        console.log(imageFile);
        const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            (err) => {
                console.log(err);
                setFields(true);
                setMsg('Error uploading : Try Again ');
                setAlertStatus('danger');
                setTimeout(() => {
                    setFields(false);
                    setisLoading(false);
                }, 2000);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageAsset(downloadURL);
                    setisLoading(false);
                    setFields(true);
                    setMsg('Image uploaded successfully');
                    setAlertStatus('success');
                    setTimeout(() => {
                        setFields(false);
                    }, 2000);
                });
            },
        );
        console.log(storageRef);
    };

    const deleteIamge = () => {
        setisLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setisLoading(false);
            setFields(true);
            setMsg('Image delete successfully');
            setAlertStatus('success');
            setTimeout(() => {
                setFields(false);
                setisLoading(false);
            }, 2000);
        });
    };

    const saveDetais = async () => {
        setisLoading(true);
        try {
            if (!title || !calories || !imageAsset || !category) {
                setFields(true);
                setMsg("Required fields can't be empry");
                setAlertStatus('danger');
                setTimeout(() => {
                    setFields(false);
                    setisLoading(false);
                }, 2000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    imageURL: imageAsset,
                    category,
                    calories,
                    qty: 1,
                    price,
                };
                saveItem(data);
                setisLoading(false);
                setFields(true);
                setMsg('Data uploaded successfully');
                setAlertStatus('success');
                setTimeout(() => {
                    setFields(false);
                    clearData();
                }, 2000);
            }
        } catch {
            setFields(true);
            setMsg('Error uploaded ');
            setAlertStatus('success');
            setTimeout(() => {
                setFields(false);
                setisLoading(false);
            }, 2000);
        }

        fetchData()
    };

    const clearData = () => {
        setTitle('');
        setImageAsset(null);
        setCalories('');
        setPrice('');
        setCategory('Select Category');
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center">
            <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
                {fields && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
                            alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'
                        }`}
                    >
                        {msg}
                    </motion.p>
                )}

                <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                    <MdFastfood className="text-xl text-gray-700" />
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        placeholder="Give me a title..."
                        className="w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder:text-gray-500 text-textColor"
                    />
                </div>

                <div className="w-full ">
                    <select
                        name=""
                        id=""
                        onChange={(e) => {
                            setCategory(e.target.value);
                        }}
                        className="outline-none w-full border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
                    >
                        <option value="other" className="bg-white">
                            Select Category
                        </option>
                        {categories &&
                            categories.map((n) => (
                                <option
                                    key={n.id}
                                    className=" w-full text-base border-0 outline-none capitalize bg-white text-headingColor "
                                    value={n.urlParamName}
                                >
                                    {n.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer">
                    {isLoading ? (
                        <>
                            <Loader />
                        </>
                    ) : (
                        <>
                            {!imageAsset ? (
                                <>
                                    <label
                                        htmlFor="uploadimage"
                                        className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                                    >
                                        <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                            <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700 " />

                                            <p className="text-gray-500 hover:text-gray-700">Click here to uploand</p>
                                        </div>
                                        <input
                                            type="file"
                                            name="uploadimage"
                                            id="uploadimage"
                                            accept="image/*"
                                            className="w-0 h-0"
                                            onChange={uploadImage}
                                        />
                                    </label>
                                </>
                            ) : (
                                <>
                                    <div className="relative h-full">
                                        <img src={imageAsset} alt="" className="w-full h-full object-cover" />
                                        <button
                                            className="-right-3 absolute bottom-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                                            onClick={deleteIamge}
                                        >
                                            <MdDelete className="text-white" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>

                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <MdFoodBank className="text-gray-700 text-2xl" />
                        <input
                            value={calories}
                            onChange={(e) => {
                                setCalories(e.target.value);
                            }}
                            placeholder="Calories"
                            type="text"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                        />
                    </div>
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <MdAttachMoney className="text-gray-700 text-2xl" />
                        <input
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                            placeholder="Price"
                            type="text"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                        />
                    </div>
                </div>

                <div className="flex items-center w-full">
                    <button
                        type="button"
                        className="ml-0 md:ml-auto w-full border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold "
                        onClick={saveDetais}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateContainer;
