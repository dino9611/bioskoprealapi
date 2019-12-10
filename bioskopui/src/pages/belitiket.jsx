import React, { Component } from 'react';
import {connect} from 'react-redux'
import Axios from 'axios'
import { APIURL } from '../support/ApiUrl';

class Belitiket extends Component {
    state = {  
        datamovie:{},
        seats:260,
        baris:0,
        booked:[],
        loading:true
    }

    componentDidMount(){

    }
    renderseat=()=>{

    }
    render(){
        console.log(this.state)
        if(this.props.location.state &&this.props.AuthLog){
            return (
                <div>
                    beli tiket
                    {this.state.loading?null:this.renderseat()}
                </div>
              );
        }
        return(
            <div>
                404 not found
            </div>
        )
    }
}

const MapstateToprops=(state)=>{
    return{
        AuthLog:state.Auth.login
    }
}
export default connect(MapstateToprops) (Belitiket);










































































// var arr=[]
// for(let i=0;i<this.state.baris;i++){
//     arr.push([])
//     for(let j=0;j<this.state.seats/this.state.baris;j++){
//         arr[i].push(1)
//     }
// }
// console.log(this.state.booked)
// for(let j=0;j<this.state.booked.length;j++){
//     console.log(this.state.booked[j].row)
//     arr[this.state.booked[j].row-1][this.state.booked[j].seat-1]=3
// }
// // for(let a=0;a<this.state.pilih.length;a++){
// //     arr[this.state.pilih[a][0]][this.state.pilih[a][1]]=2
// // }
// console.log(arr)






















// var studioId=this.props.location.state.studioId
//        var movieId=this.props.location.state.id
//         Axios.get(`${APIURL}studios/${studioId}`)
//         .then((res1)=>{
//             console.log(res1.data)
//             Axios.get(`${APIURL}orders?movieId=${movieId}&jadwal=12`)
//             .then((res2)=>{
//                 var arr=[]
//                 console.log(res2.data)
//                 res2.data.forEach((val) => {
//                     arr.push(Axios.get(`${APIURL}ordersDetails?orderId=${val.id}`))
//                 });
//                 var arr2=[]
//                 Axios.all(arr).then((results)=> {
//                     results.forEach((val)=>{
//                         arr2.push(...val.data)
//                     })
//                     // console.log(arr2)
//                     this.setState({
//                         datamovie:this.props.location.state,
//                         seats:res1.data.jumlahKursi,
//                         baris:res1.data.jumlahKursi/20,
//                         booked:arr2,
//                         loading:false
//                     })
//                 });
//             }).catch((err)=>{

//             })
//         }).catch((err)=>{
//             console.log(err)
//         })