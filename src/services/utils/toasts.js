import {toast} from "react-toastify";
import {Navigate} from "react-router-dom";

export const notify_error = (error) => {
    toast.error(error, {
        icon: "❌",
        hideProgressBar: true,
        autoClose: 2000,
    })
}

export const notify_promise = (promise, successMessage, icon) => {
    if (successMessage === undefined) {
        successMessage = "Done"
    }
    if (icon === undefined) {
        icon = "✔️"
    }
    toast.promise(
        promise,
        {
            pending: {
                render(){
                    return "One Moment..."
                },
                icon: false,
            },
            success: {
                render({res}){
                    return successMessage
                },
                // other options
                icon: icon,
                autoClose: 1000,
                hideProgressBar: true
            },
            error: {
                hideProgressBar: true,
                render({data}){
                    let content = <p>{data.message}</p>
                    if (data.type === "auth") {
                        content =  <div className={"error"}>
                            <p>Please login again</p>
                            <Navigate to={"/login"}/>
                        </div>
                    }
                    return content
                }
            }
        }
    )
}