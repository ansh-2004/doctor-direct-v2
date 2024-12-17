

import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { toast } from "react-toastify";
const LabReport = () => {
  const [reportUrl, setReportUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    pid: '555',
  });
  

  const reportRef = useRef();
  const currentDate = new Date().toLocaleString();

  const chemicalExams = [
    { name: 'Chloride', value: '101.40', reference: '98 - 107', unit: 'mg/dL' },
    { name: 'Proteins', value: '36.80', reference: '20 - 45', unit: 'mg/dL' },
    { name: 'Sugar', value: '54.10', reference: '40 - 80', unit: 'mg/dL' },
  ];

  const physicalExams = [
    { name: 'Colour', value: 'Colourless' },
    { name: 'Quantity', value: '3 ml' },
    { name: 'Appearance', value: 'Clear' },
    { name: 'Coagulum', value: 'Present' },
    { name: 'Blood', value: 'Absent' },
  ];

  const microscopicExams = [
    { name: 'Total W.B.C. Count', value: '5500' },
    { name: 'Polymorphs', value: 'Present' },
    { name: 'Lymphocytes', value: 'Absent' },
    { name: 'Any Others', value: '---' },
    { name: "RBC'S", value: 'Absent' },
    { name: 'Z.N. Stain', value: 'AFB not detected.' },
    { name: "Gram's Smear", value: 'Organism not detected.' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [qrCodeURL, setQrCodeURL] = useState('');

  const generateReport = async () => {
    setIsLoading(true);

    try {
      // Wait for a small delay to ensure the hidden report is rendered
      await new Promise(resolve => setTimeout(resolve, 100));

      const element = reportRef.current;

      // const checkIfUserExist  = await fetch(`${process.env.REACT_APP_BACKEND_URL}/checkIfUserExist`,{
      //   method:'POST',
      //   body:JSON.stringify(formData)
      // })

      // const res = await checkIfUserExist.json();
      // if(!res.success)
      // {
      //   toast.error('User does not Exist. Please sign up first');
      //   return;
      // }
      const canvas = await html2canvas(element, {
        logging: false,
        useCORS: true,
        scale: 1.5,
        imageTimeout: 0,
        removeContainer: true,
        backgroundColor: null,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
        compress: true,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.8);
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);

      const pdfBlob = await pdf.output('blob');
      if (pdfBlob.size > 10 * 1024 * 1024) {
        throw new Error('File size too large');
      }

      
      const formDataToSend = new FormData();
      formDataToSend.append('file', pdfBlob, 'lab-report.pdf');


      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();
      if (result.secure_url) {
        setReportUrl(result.secure_url);

        // Generate QR code with the secure URL from Cloudinary
        const qrResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/generateQRCode`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pdfUrl: result.secure_url }),
        });
        
        const qrData = await qrResponse.json();
        setQrCodeURL(qrData.qrCodeURL);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Patient Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button
              onClick={generateReport}
              disabled={isLoading || !formData.name || !formData.age}
              className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? 'Generating Report...' : 'Generate Lab Report'}
            </button>
          </div>

          {reportUrl && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Report URL:</h3>
              <a 
                href={reportUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 break-all"
              >
                {reportUrl}
              </a>
            </div>
          )}
        </div>

        {/* Hidden Report Section */}
        <div ref={reportRef} style={{ position: 'absolute', left: '-9999px', top: 0 }}>
          <div className="report-container bg-white p-8 rounded-lg shadow-lg" style={{ width: '800px' }}>
            {/* Report Header */}
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <div className="flex items-center gap-4">
                <div className="text-blue-600">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 18.5L4 16v-6l8 4 8-4v6l-8 4.5z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">SMART PATHOLOGY LAB</h1>
                  <p className="text-gray-600">Accurate | Caring | Instant</p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-600">
                <p>9123456789 / 8912345678</p>
                <p>smartpatholab@gmail.com</p>
              </div>
            </div>

            {/* Patient Info */}
            <div className="flex justify-between mb-8 p-4 bg-gray-50 rounded-lg shadow-sm">
              <div>
                <h2 className="text-xl font-bold mb-2 text-gray-800">{formData.name}</h2>
                <p className="text-gray-600">Age: {formData.age} Years</p>
                <p className="text-gray-600">Sex: {formData.gender}</p>
                <p className="text-gray-600">PID: {formData.pid}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Registered on: {currentDate}</p>
                <p className="text-gray-600">Collected on: {currentDate}</p>
                <p className="text-gray-600">Reported on: {currentDate}</p>
              </div>
            </div>

            {/* Examination Sections */}
            {[
              { title: 'CHEMICAL EXAMINATION', exams: chemicalExams },
              { title: 'PHYSICAL EXAMINATION', exams: physicalExams },
              { title: 'MICROSCOPIC EXAMINATION', exams: microscopicExams }
            ].map((section, index) => (
              <div key={index} className="mb-8">
                <h3 className="font-bold mb-2 bg-blue-50 p-2 rounded">{section.title}</h3>
                <table className="w-full">
                  <tbody>
                    {section.exams.map((exam, idx) => (
                      <tr key={idx} className="border-b">
                        <td className="p-2 w-1/2">{exam.name}</td>
                        <td className="p-2">{exam.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            {/* Footer */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex justify-between">
                {[
                  { name: 'Medical Lab Technician', title: 'DMLT, BMLT' },
                  { name: 'Dr. Payal Shah', title: 'MD, Pathologist' },
                  { name: 'Dr. Vimal Shah', title: 'MBBS, MD - Medicine' }
                ].map((staff, idx) => (
                  <div key={idx} className="text-center">
                    <p className="font-bold">{staff.name}</p>
                    <p className="text-sm text-gray-600">({staff.title})</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Display */}
        {qrCodeURL && (
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-4">Scan this QR Code to generate your report:</h2>
            <img src={qrCodeURL} alt="Generated QR Code" className="inline-block shadow-lg rounded-lg" />
          </div>
        )}
      </div>
    </>
  );
};

export default LabReport;

