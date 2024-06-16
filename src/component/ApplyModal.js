import React, { useState } from "react";
import { Form, Input, message, Spin } from "antd";
import axios from "axios";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { server } from "../lib/apiList";

const ApplyModal = ({ isOpen, onClose, jobId, setIsApllied }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [urlFile, setUrlFile] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      message.error("Vui lòng chọn một tệp PDF");
    }
  };

  const pdfToImage = async (pdfFile) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(pdfFile);

    return new Promise((resolve, reject) => {
      fileReader.onload = async () => {
        const typedArray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const context = canvas.getContext("2d");

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        page
          .render(renderContext)
          .promise.then(() => {
            canvas.toBlob((blob) => {
              resolve(blob);
            });
          })
          .catch(reject);
      };
    });
  };

  const handleSubmit = async (values) => {
    const { sop } = values;

    // if (!urlFile) {
    //   message.error('Please upload your CV');
    //   return;
    // }

    if (!file) {
      message.error("Please select a file to upload type pdf");
      return;
    }

    setLoading(true);

    try {
      const imageBlob = await pdfToImage(file);

      const data = new FormData();
      data.append("file", imageBlob, "image.jpg");
      data.append("upload_preset", "yb8k2xvj");
      data.append("cloud_name", "dsjiwboyz");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dsjiwboyz/image/upload",
        {
          method: "post",
          body: data,
        }
      );
      const resumeData = await res.json();
      // setUrlFile(resumeData.secure_url);
      try {
        await axios.post(`${server}/upload/uploadCV`, {
          resumeUrl: resumeData.secure_url,
          jobId: jobId,
          sop: sop,
        });

        message.success("Application submitted successfully");
        setIsApllied(true);
        form.resetFields();
        setUrlFile("");
        onClose();
      } catch (error) {
        console.error("Error submitting application:", error);
        message.error("Error submitting application");
      } finally {
        setLoading(false);
      }
      message.success("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      message.error("Error uploading file");
    } finally {
      setLoading(false);
    }

    setLoading(true);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-3/5 relative">
        <Form form={form} onFinish={handleSubmit}>
          <div className="flex justify-end pb-2">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-red-500"
              disabled={loading}
            >
              ✖
            </button>
          </div>
          <div className="flex justify-center">
            <div className="w-2/3">
              <Form.Item
                name="sop"
                label="Please send a few words to the company!"
                rules={[{ required: true, message: "Please write something" }]}
              >
                <Input.TextArea
                  placeholder="Please send a few words to the company!"
                  rows={4}
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item label="Your CV">
                <input
                  className="pt-2"
                  type="file"
                  accept="application/pdf, image/*"
                  name="file"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              type="submit"
              disabled={loading}
            >
              Send
            </button>
          </div>
        </Form>
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <Spin size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyModal;
