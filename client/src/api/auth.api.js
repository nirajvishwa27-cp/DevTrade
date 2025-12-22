import api from "../utils/axios";

export const signup = async(data) => {
    const res = await api.post("/auth/signup", data)
    return res
}

export const sendOtp = async(data) => {
    const res = await api.post("/auth/send-otp", data)
    return res
}

export const verifyOtp = async(data) => {
    const res = await api.post("/auth/verify-otp", data)
    return res
}

export const loginUser = async(data) => {
    const res = await api.post("/auth/login", data)
    return res.data
}

export const logoutUser = async(data) => {
    const res = await api.post("/auth/logout", data)
    return res.data
}


export const getMyProfile = async () => {
  const res = await api.get("/auth/getMyProfile");
  return res.data.user;
};


