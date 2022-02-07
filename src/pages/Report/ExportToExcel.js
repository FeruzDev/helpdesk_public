import React, {useEffect, useMemo, useState} from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";

const ExportToExcel = ({apiData, fileName}) => {


    const [data, setData] = useState([])
    const [count, setCount] = useState(null)



    useEffect(() => {



    }, [])





    const op = useMemo(() => {

        axios.get(API_PATH + 'ticket/v1/list/', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(r => {
                    setData(r.data.data)
                }
            )



    },[])

        const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (apiData, fileName) => {

        axios.get(API_PATH + 'ticket/v1/list/', {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(r => {

                setCount(r.data.count)



                axios.get(API_PATH + 'ticket/v1/list/?per_page=' + r.data.count, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
                    .then(res => {
                        const ws = XLSX.utils.json_to_sheet(res.data.data);
                        const wb = {Sheets: {data: ws}, SheetNames: ["data"]};
                        const excelBuffer = XLSX.write(wb, {bookType: "xlsx", type: "array"});
                        const data = new Blob([excelBuffer], {type: fileType});
                        FileSaver.saveAs(data, fileName + fileExtension);

                    })


                }
            )



    };

    return (

        <>

        <button onClick={(e) => exportToCSV(apiData, fileName) } className="bg-transparent ml-4" style={{border: "1px solid #E8E8EA", borderRadius: "18px", width: "48px", height: "48px",  }}><img src="/img/icon/download.svg" style={{ marginTop: "-5px"}}/></button>
        </>

    );
};

export default ExportToExcel;