// import axios from "axios";

// export const uploadToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "devtrade_preset"); 
//   formData.append("folder", "devtrade/projects");


//   const res = await axios.post(
//     `https://api.cloudinary.com/v1_1/dyr7vy4ti/image/upload`,
//     formData
//   );

//   return res.data.secure_url; // returns the usable image URL
// };


// export const uploadZipToCloudinary = async (file) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", "devtrade_raw");   // RAW preset
//   formData.append("folder", "devtrade/projects/files");

//   const res = await axios.post(
//     "https://api.cloudinary.com/v1_1/dyr7vy4ti/raw/upload",
//     formData
//   );

//   return res.data.secure_url;
// };


import axios from "axios";

export const uploadToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "devtrade_preset");
    formData.append("folder", "devtrade/projects");

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dyr7vy4ti/image/upload`,
      formData
    );

    console.log("IMAGE UPLOAD:", res.data);
    return res.data.secure_url;
  } catch (err) {
    console.error("IMAGE UPLOAD ERROR:", err.response?.data || err.message);
    return null;
  }
};


export const uploadZipToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "devtrade_raw");
    formData.append("folder", "devtrade/projects/files");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dyr7vy4ti/raw/upload",
      formData
    );

    console.log("ZIP UPLOAD:", res.data);
    return res.data.secure_url;
  } catch (err) {
    console.error("ZIP UPLOAD ERROR:", err.response?.data || err.message);
    return null;
  }
};
