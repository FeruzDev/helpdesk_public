import axios from "axios";
import {API_PATH, TOKEN_NAME} from "../../tools/constants";
import {UPDATE_STATE} from "../actionTypes/createAgentType";
import {toast} from "react-toastify";



export function updateState (data){
    return {
        type: UPDATE_STATE,
        payload: data
    }
}


export function getAllTicket(Number, data , pageIndex){
    return function (dispatch){



        axios.get(  API_PATH + 'ticket/v1/list/'   , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({getTickets: res.data.data}));
                dispatch(updateState({getTickets2: res.data.data}));
                dispatch(updateState({changeGetTickets2: res.data}));
                dispatch(updateState({getTicketsSearch: res.data.data}));
                dispatch(updateState({pageIndex: Number}));
                dispatch(updateState({AllCount: res.data}));

            })
            .catch(err =>{

            })




    }
}


export function getAllTicketSortByDate(startDate, endDate){
    return function (dispatch){



        axios.get(  API_PATH + 'ticket/v1/list/?start_date=' + startDate  + '&end_date=' + endDate   , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({getTickets: res.data.data}));
                dispatch(updateState({getTickets2: res.data.data}));
                dispatch(updateState({changeGetTickets2: res.data}));
                dispatch(updateState({getTicketsSearch: res.data.data}));
                dispatch(updateState({pageIndex: Number}));
                dispatch(updateState({AllCount: res.data}));

            })
            .catch(err =>{

            })




    }
}




export function getAllTicketForId(  data){
    return function (dispatch, getState){

        console.log(data)
        //
        //
        //
        //
        //
        //
        // axios.get(  API_PATH + 'ticket/v1/list/' +  "?receiver=" +data , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
        //
        //     .then(res =>{
        //
        //         // dispatch(updateState({openCount: res.data.data}));
        //         // dispatch(updateState({ClosedCount: res.data.data}));
        //         dispatch(updateState({AllCount: res.data}));
        //
        //
        //     })
        //     .catch(err =>{
        //
        //     })
        //
        //
        // axios.get(  API_PATH + 'ticket/v1/list/?status=Open' +  "&receiver=" + data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
        //
        //     .then(res =>{
        //
        //         dispatch(updateState({openCount: res?.data}));
        //         // dispatch(updateState({ClosedCount: res.data.data}));
        //         // dispatch(updateState({AllCount: res.data}));
        //
        //
        //     })
        //     .catch(err =>{
        //
        //     })
        //
        //
        //
        //
        // axios.get(  API_PATH + 'ticket/v1/list/?status=Closed' +  "&receiver=" + data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
        //
        //     .then(res =>{
        //
        //         // dispatch(updateState({openCount: res.data.data}));
        //         dispatch(updateState({ClosedCount: res.data}));
        //         // dispatch(updateState({AllCount: res.data}));
        //
        //
        //     })
        //     .catch(err =>{
        //
        //     })
        //
        //
        //
        //




    }
}




export function getAllTicketForSearch(data){

    // console.log(data)

     return function (dispatch, getState){

        let   newArr = getState().ticketData.getTickets2.filter(item => item.subject.includes(data))

        dispatch(updateState({changeGetTickets2: newArr}))


    }
}







export function getAllTicketToHandle(Number){
    return function (dispatch){

        axios.get(API_PATH + 'ticket/v1/list-own/?page=' + (Number  ?  Number :  "1") , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({getTicketsToHandle: res.data.data}));
                dispatch(updateState({btc: res.data}));

            })
            .catch(err =>{
            })
    }
}








export function getMyOpenTicket(Number){
    return function (dispatch){


        axios.get(API_PATH + 'ticket/v1/list-own?status=Open&page=' +  (Number  ? Number : '1') , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({getOpenTickets: res.data.data}));
                dispatch(updateState({boc: res.data}));

            })
            .catch(err =>{
            })
    }
}











export function getTicketsSevenDays( end_date , start_date ){
    return function (dispatch){



        axios.get(API_PATH + 'ticket/v1/list-own?start_date=' + end_date + '&end_date=' + start_date   , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({getLastDaysTickets: res.data.data}));
                dispatch(updateState({bot: res.data}));



            })
            .catch(err =>{
            })
    }
}






export function getStatusList(){
    return function (dispatch){
        axios.get(API_PATH + "ticket/v1/status-list/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res=>{
                dispatch(updateState({ticketStatusList: res.data.data}))
                dispatch(updateState({ticketStatusList: res.data.data}))
            })
            .catch(err=>{
            })
    }
}



export function createTIcket(data, history){
    return function (dispatch){


        let ticketData = new FormData();
        ticketData.append("client_full_name", data.client_full_name)
        ticketData.append("client_phone_number", data.client_phone_number)
        ticketData.append("subject", data.subject)
        ticketData.append("content", data.content)
        ticketData.append("team", data.team)
        ticketData.append("receiver", data.receiver)
        ticketData.append("ticket_status", data.ticket_status)
        ticketData.append("priority", data.priority)

axios.post(API_PATH + "ticket/v1/create/" , ticketData, {headers:  {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
    .then(res =>{



        history.push("/tickets/all-tickets")



        toast.success("Ticket create")

    })
    .catch(err =>{
        toast.error("Ticket don't create")

    })


}
}




export function createTIcketUpdate(data, history, ticketId){
    return function (dispatch){


        let ticketData = new FormData();
        ticketData.append("client_full_name", data.client_full_name)
        ticketData.append("client_phone_number", data.client_phone_number)
        ticketData.append("subject", data.subject)
        ticketData.append("content", data.content)
        ticketData.append("team", data.team)
        ticketData.append("receiver", data.receiver)
        ticketData.append("ticket_status", data.ticket_status)
        ticketData.append("priority", data.priority)

        axios.put(API_PATH + "ticket/v1/retrieve-update/" + ticketId + "/" , ticketData, {headers:  {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{



                history.push("/tickets/commit/" + ticketId)



                toast.success("Ticket update")

            })
            .catch(err =>{
                toast.error("Ticket don't create")

            })


    }
}

export function ticketInfo(ticketId){

    return function (dispatch){
        axios.get(API_PATH  + "ticket/v1/retrieve-update/" +  ticketId ,{headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res=>{
                dispatch(updateState({ticketInfoObject: res.data.data}))
            })
            .catch(err=>{
            })
    }
}

export function changeTicketStatus(data, values){
    return function (dispatch){



        axios.patch(API_PATH + "ticket/v1/retrieve-update/" + data + "/", {ticket_status: values}, {headers:  {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {

                dispatch(getAllTicket())
                dispatch(getTicketsSevenDays())
                dispatch(getMyOpenTicket())
                dispatch(getAllTicketToHandle())
                dispatch(ticketInfo())
                dispatch(OpenStatusCount())
                dispatch(ClosedStatusCount())
                dispatch(PendingStatusCount())
                toast.success("Status changed")

            })
            .catch(err =>{

                dispatch(getAllTicket())
                dispatch(getTicketsSevenDays())
                dispatch(getMyOpenTicket())
                dispatch(getAllTicketToHandle())
                dispatch(OpenStatusCount())
                dispatch(ClosedStatusCount())
                dispatch(PendingStatusCount())

            })
    }
}




export function changeTicketPr(data, values){
    return function (dispatch){




        axios.patch(API_PATH + "ticket/v1/retrieve-update/" + data + "/", {priority: values}, {headers:  {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res => {

                dispatch(getAllTicket())
                dispatch(getTicketsSevenDays())
                dispatch(getMyOpenTicket())
                dispatch(getAllTicketToHandle())
                dispatch(OpenStatusCount())
                dispatch(ClosedStatusCount())
                dispatch(PendingStatusCount())



                toast.success("Priority changed")

            })
            .catch(err =>{

                dispatch(getAllTicket())
                dispatch(getTicketsSevenDays())
                dispatch(getMyOpenTicket())
                dispatch(getAllTicketToHandle())
                dispatch(OpenStatusCount())
                dispatch(ClosedStatusCount())
                dispatch(PendingStatusCount())
            })
    }
}



export function filterStatusFunction(byName){

    return function (dispatch){
        axios.get(API_PATH + 'ticket/v1/list/?status=' + byName , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({getTickets: res.data.data}));

            })
            .catch(err =>{
            })
    }
}



export function getCommit(data, history){


    return function (dispatch){

        axios.get(API_PATH + "review/v1/list-create/" +   data  + "/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{
                dispatch(updateState({commitList: res.data.data}))
                dispatch(updateState({selectedCommitId: data}))

                history.push("commit/" + data)

            })
            .catch(err =>{


            })
    }

}






export function sendCommit(data, ticketId){
    return function (dispatch){

        axios.post(API_PATH + "review/v1/list-create/" + ticketId + "/", data , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                toast.success("Your message send")


                window.scrollTo(0, 0)

                if (res.status ===201){
                    axios.get(API_PATH + "review/v1/list-create/" +   ticketId  + "/", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
                        .then(res =>{
                            dispatch(updateState({commitList: res.data.data}))
                            dispatch(updateState({selectedCommitId: data}))
                            document.getElementById("textContent").value = "";


                        })
                        .catch(err =>{


                        })
                 }
            })
            .catch(err=>{
                toast.error("Failed")
            })
    }
}









export function OpenStatusCount(){
    return function (dispatch){
        axios.get(API_PATH + 'ticket/v1/list?status=Open' , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({openCount: res?.data}))
            })
    }
}





export function PendingStatusCount(){
    return function (dispatch){
        axios.get(API_PATH + 'ticket/v1/list?status=Pending' , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({PendingCount: res?.data}))
            })
    }
}





export function ClosedStatusCount(){
    return function (dispatch){
        axios.get(API_PATH + 'ticket/v1/list?status=Closed' , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({ClosedCount: res?.data}))
            })
    }
}







export function todayTicket(today){
    return function (dispatch){
        axios.get(API_PATH + "ticket/v1/list?status=Open&start_date="+ today + "&end_date=" + today , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{

                dispatch(updateState({subOpen: res.data}))
            })


        axios.get(API_PATH + "ticket/v1/list?status=Pending&start_date="+ today + "&end_date=" + today , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{

                dispatch(updateState({subPending: res.data}))
            })

        axios.get(API_PATH + "ticket/v1/list?status=Closed&start_date="+ today + "&end_date=" + today , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{

                dispatch(updateState({subClosed: res.data}))
            })


        axios.get(API_PATH + "ticket/v1/list?start_date="+ today + "&end_date=" + today , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{

                dispatch(updateState({subAllTickets: res.data}))
            })


        axios.get(API_PATH + "ticket/v1/list-own?is_read=false", {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{

                dispatch(updateState({todayNoOpened: res.data}))
            })



    }
}

export function  ClosedNext(data){
    return function (dispatch){
        axios.get(API_PATH + "ticket/v1/list/?status=Closed"  + "&page=" +  data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )

            .then(res =>{
                dispatch(updateState({ClosedCount: res.data}))
                dispatch(updateState({pActive: data}))

            })
    }
}
export function  ClosedNextFunc(data){
    return function (dispatch){
        axios.get(   data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )

            .then(res =>{
                dispatch(updateState({ClosedCount: res.data}))
                dispatch(updateState({pActive: res.data.page}))

            })
    }
}
export function  allNext(data, forSerPagfilter){
    return function (dispatch, ){
        axios.get(API_PATH + "ticket/v1/list/?page=" +  data + "&q=" + forSerPagfilter, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )

            .then(res =>{
                dispatch(updateState({changeGetTickets2: res.data}))
                dispatch(updateState({pActive: data}))

            })
    }
}
export function  allNextWithFilter(data){
    return function (dispatch, getStatus){

        axios.get(API_PATH + "ticket/v1/list/?q=" + getStatus().forSerPagfilter + "&page=" +  data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )

            .then(res =>{
                dispatch(updateState({changeGetTickets2: res.data}))
                dispatch(updateState({pActive: data}))

            })
    }
}
export function   AllFunc(data){
    return function (dispatch){
        axios.get(   data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )

            .then(res =>{
                dispatch(updateState({changeGetTickets2: res.data}))
                dispatch(updateState({pActive: res.data.page}))

            })
    }
}
export function  allNextSearch(data, idUrl, prUrl){
    return function (dispatch){
        axios.get(API_PATH + "ticket/v1/list/?page=" + data + "&q=" +  idUrl + "&priority=" + (prUrl ? prUrl : ""), {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )

            .then(res =>{
                dispatch(updateState({changeGetTickets2: res.data}))
                dispatch(updateState({pActive: data}))

            })
    }
}
export function  PendingNext(data){
    return function (dispatch){
        axios.get(API_PATH + "ticket/v1/list/?status=Pending"  + "&page=" +  data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )

            .then(res =>{
                dispatch(updateState({PendingCount: res.data}))
                dispatch(updateState({pActive: data}))

            })
    }
}
export function  PendingNextFunc(data){
    return function (dispatch){
        axios.get(   data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )
            .then(res =>{
                dispatch(updateState({PendingCount: res.data}))
                dispatch(updateState({pActive: res.data.page}))

            })
    }
}

export function  OpenNext(data){
    return function (dispatch){
        axios.get(API_PATH + "ticket/v1/list/?status=Open"  + "&page=" +  data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )
            .then(res =>{
                dispatch(updateState({openCount: res.data}))
                dispatch(updateState({pActive: data}))

            })
    }
}

export function  OpenNextFunc(data){
    return function (dispatch){
        axios.get( data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )

            .then(res =>{
                dispatch(updateState({openCount: res.data}))
                dispatch(updateState({pActive: res.data.page}))

            })
    }
}

export function  thtNext(data){
    return function (dispatch){
        axios.get(API_PATH + "ticket/v1/list-own/?page=" +  data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )

            .then(res =>{
                dispatch(updateState({btc: res.data}))
                dispatch(updateState({pActive: data}))

            })
    }
}

export function  thtFunc(data){
    return function (dispatch){
        axios.get( data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )

            .then(res =>{
                dispatch(updateState({btc: res.data}))
                dispatch(updateState({pActive: res.data.page}))
            })
    }
}

export function  myOpenNext(data){
    return function (dispatch){
        axios.get(API_PATH + "ticket/v1/list-own/?status=Open&page=" +  data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )

            .then(res =>{
                dispatch(updateState({boc: res.data}))
                dispatch(updateState({pActive: data}))

            })
    }
}

export function  myOpenFunc(data){
    return function (dispatch){
        axios.get( data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )

            .then(res =>{
                dispatch(updateState({boc: res.data}))
                dispatch(updateState({pActive: res.data.page}))

            })
    }
}

export function sevenDayNext( end_date , start_date,  data){
    return function (dispatch){
        axios.get(API_PATH + 'ticket/v1/list-own?start_date=' + end_date + '&end_date=' + start_date + "&page=" + data    , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{
                dispatch(updateState({bot: res.data}));
                dispatch(updateState({pActive: res.data.page}))
            })
            .catch(err =>{

            })
    }
}

export function  sevenDayFunc(data){
    return function (dispatch){
        axios.get( data, {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}} )

            .then(res =>{
                dispatch(updateState({bot: res.data}))
                dispatch(updateState({pActive: res.data.page}))

            })
    }
}

export function getAllTicketFilter(data){
    return function (dispatch){
        axios.get(  API_PATH + 'ticket/v1/list/?priority=' + data   , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{
                dispatch(updateState({changeGetTickets2: res.data}));
                dispatch(updateState({forSerPag: true}));
            })
            .catch(err =>{
            })
    }
}
export function getAllTicketFilterWithAgent(data){
    return function (dispatch){
        axios.get(  API_PATH + 'ticket/v1/list/?receiver=' + data   , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{
                dispatch(updateState({changeGetTickets2: res.data}));
                dispatch(updateState({forSerPag: true}));
            })
            .catch(err =>{

            })




    }
}
export function editTicketReciever(data, receiver){

    return function (dispatch){

        let ticketData = new FormData();
        ticketData.append("receiver", receiver)

        axios.patch(API_PATH  + 'ticket/v1/retrieve-update/' + data + "/", ticketData , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})
            .then(res =>{

                toast.success("receiver changed")
            })
    }
}



export function changeCheckPriorty(data, priortyId){
    return function (dispatch){

        data.map(item => {
            axios.patch(  API_PATH +  "ticket/v1/retrieve-update/" + item.id + "/", {priority: priortyId},    {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

                .then(res =>{

                    dispatch(updateState({changeGetTickets2: res.data}));
                    // dispatch(updateState({forSerPag: true}));
                    dispatch(getAllTicket())
                    // toast.success("Priority changed")


                })
                .catch(err =>{

                })


        })


    }
}


export function changeCheckStatus(data, statusId){
    return function (dispatch){

        data.map(item => {
            axios.patch(  API_PATH +  "ticket/v1/retrieve-update/" + item.id + "/", {ticket_status: statusId},    {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

                .then(res =>{

                    dispatch(updateState({changeGetTickets2: res.data}));
                    // dispatch(updateState({forSerPag: true}));
                    dispatch(getAllTicket())



                })
                .catch(err =>{

                })


        })


    }
}




export function editAllAgent(data,  teams){
    return function (dispatch){

        data.map(item => {
            axios.patch(  API_PATH +  "ticket/v1/retrieve-update/" + item.id + "/", {receiver : teams.receiver, team : teams.team},    {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

                .then(res =>{

                    dispatch(updateState({changeGetTickets2: res.data}));
                    // dispatch(updateState({forSerPag: true}));
                    dispatch(getAllTicket())
                })
                .catch(err =>{

                })
        })
    }
}






export function prUrgent(){

    return function (dispatch){
        axios.get(API_PATH + 'ticket/v1/list/?priority=' + 1 , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({UrgentCount: res.data.data?.length}));

            })
            .catch(err =>{

            })
    }
}




export function prHigh(){

    return function (dispatch){
        axios.get(API_PATH + 'ticket/v1/list/?priority=' + 1 , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({HighCount: res.data.data?.length}));

            })
            .catch(err =>{

            })
    }
}




export function prMedium(){

    return function (dispatch){
        axios.get(API_PATH + 'ticket/v1/list/?priority=' + 0 , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({MediumCount: res.data.data?.length}));

            })
            .catch(err =>{

            })
    }
}




export function prLow(){

    return function (dispatch){
        axios.get(API_PATH + 'ticket/v1/list/?priority=' + -1 , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({LowCount: res.data.data?.length}));

            })
            .catch(err =>{

            })
    }
}






export function prVeryLow(){

    return function (dispatch){
        axios.get(API_PATH + 'ticket/v1/list/?priority=' + -2 , {headers: {Authorization: "Bearer " + localStorage.getItem(TOKEN_NAME)}})

            .then(res =>{
                dispatch(updateState({VeryLowCount: res.data.data?.length}));

            })
            .catch(err =>{

            })
    }
}


