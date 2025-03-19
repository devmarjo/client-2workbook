"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAuth } from "@/hooks/useAuth";
import React, { useState, useEffect } from "react";
import dotenv from "dotenv";
dotenv.config();

// Extend the global Window interface so TypeScript knows about gapi and google.picker.
declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

interface GoogleDrivePickerProps {
  // Callback that will be called when the user picks a file.
  onPicked: (file: any, createPicker: () => void) => void;
  onCancel?: () => void;
  folder?: boolean
}

const GoogleDrivePicker: React.FC<GoogleDrivePickerProps> = ({ onPicked, folder, onCancel }) => {
  const [pickerApiLoaded, setPickerApiLoaded] = useState(false);
  const auth = useAuth()

  // Load the Google API script (if not already loaded)
  useEffect(() => {
    if (!window.gapi) {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = () => {
        // Load the picker API after the script is loaded.
        window.gapi.load("picker", { callback: onPickerApiLoad });
      };
      document.body.appendChild(script);
    } else {
      window.gapi.load("picker", { callback: onPickerApiLoad });
    }
  }, []);

  // Callback when the picker API is loaded
  const onPickerApiLoad = () => {
    setPickerApiLoaded(true);
  };

  useEffect(() => {
    if (auth?.accessToken && pickerApiLoaded) {
      createPicker()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.accessToken, pickerApiLoaded])

  // Function to create and show the picker
  const createPicker = () => {
    if (pickerApiLoaded && auth?.accessToken) {
      const developerKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
      // const developerKey = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      // const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

      // Create a DocsView that shows all files (you can customize this view)
      const docsView = folder ?
       new window.google.picker.DocsView(window.google.picker.ViewId.FOLDERS)
        .setIncludeFolders(true)
        .setSelectFolderEnabled(true) : 
        new window.google.picker.DocsView(window.google.picker.ViewId.DOCS)
        .setIncludeFolders(true); 

      // Build the picker
      const picker = new window.google.picker.PickerBuilder()
        .addView(docsView)
        .setOAuthToken(auth?.accessToken)
        .setDeveloperKey(developerKey)
        .setCallback(pickerCallback)
        .build();

      // Display the picker
      picker.setVisible(true);
    } else {
      console.error("Picker API not loaded or OAuth token missing.");
    }
  };

  // Callback function for when a file is picked
  const pickerCallback = (data: any) => {
    console.log('GPickerAPI:', data.action)
    if (data.action === window.google.picker.Action.PICKED) {
      const picked = data.docs[0];
      onPicked(picked, createPicker);
    } else if (data.action === window.google.picker.Action.CANCEL) {
      if (onCancel) {
        onCancel()
      }
    }
  };

  return (
    <div>
      {
        !pickerApiLoaded && <>LOADING . . .</>
      }
    </div>
  );
};

export default GoogleDrivePicker;