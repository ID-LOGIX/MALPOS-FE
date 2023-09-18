import { toast } from "react-toastify";
import React from "react";
import { useEffect } from "react";
function HandleNotification(message, cardStyle) {
        const bellAudio = new Audio("/NotificationBells/bell3.mp3"); 
        bellAudio.play()
    
  toast(
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "#bc6a76",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        color: "white",
      }}
    >
      <div
        style={{
          background: cardStyle.backgroundColor || "white", // Customizable background color
          padding: cardStyle.padding || "20px", // Customizable padding
          borderRadius: cardStyle.borderRadius || "10px", // Customizable border radius
          width: cardStyle.width || "300px", // Customizable width
          height: cardStyle.height || "200px",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          fontSize:"30px",
          fontWeight:700
           // Customizable height
        }}
      >
        {message}
      </div>
    </div>,
    {
      autoClose: false, // To keep it open until clicked
      closeButton: false, // No close button, we'll close it manually
      hideProgressBar: true,
      closeOnClick: false, // Prevent default click behavior (closes the notification)
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      onClick: () => toast.dismiss(), // Close the notification when clicked
    }
  );
}

export { HandleNotification };
