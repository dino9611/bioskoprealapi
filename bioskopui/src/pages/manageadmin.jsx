import React, { Component } from 'react';
import Axios from 'axios'
import {Table,TableBody,TableHead,TableCell,TableRow} from '@material-ui/core'
import { APIURL } from '../support/ApiUrl';
import {Modal,ModalBody,ModalFooter,ModalHeader} from 'reactstrap'
import Fade from 'react-reveal/Fade'




class ManageAdmin extends Component {
    state = { 
        datafilm:[],
        readmoreselected:-1,
        modaladd:false
    }

    componentDidMount(){
        Axios.get(`${APIURL}movies`)
        .then((res)=>{
            // console.log(res.data)
            this.setState({datafilm:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    onSaveAddDataClick=()=>{
        var jadwaltemplate=[12,14,16,18,20]
        var jadwal=[]
        for(var i=0;i<jadwaltemplate.length;i++){
            if(this.refs[`jadwal${i}`].checked){
                jadwal.push(jadwaltemplate[i])
            }
        }
        var iniref=this.refs
        var title=iniref.title.value
        var image=iniref.image.value
        var sinopsis=iniref.sinopsis.value
        var sutradara=iniref.sutradara.value
        var genre=iniref.genre.value
        var durasi=iniref.durasi.value
        var produksi='RANS ENTERTAINMENT'
        var data={
            title:title,
            image,
            sinopsis,
            sutradara,
            genre,
            durasi,
            produksi,
            jadwal
        }
        Axios.post(`${APIURL}movies`,data)
        .then(()=>{
            Axios.get(`${APIURL}movies`)
            .then((res)=>{
                this.setState({datafilm:res.data,modaladd:false})
            })
            .catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderMovies=()=>{
        return this.state.datafilm.map((val,index)=>{
            return(
                <TableRow key={index}>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell><img src={val.image} alt={'gambar'} height='200px'/></TableCell>
                    {   this.state.readmoreselected===index?
                            <TableCell style={{width:'300px'}}>
                                {val.sinopsis} 
                                <span style={{color:'red'}} onClick={()=>this.setState({readmoreselected:-1})}>
                                    Read less
                                </span>
                            </TableCell>
                        :
                        <TableCell style={{width:'300px'}}>
                            {val.sinopsis.split('').filter((val,index)=>index<=50)}
                            <span style={{color:'red'}} onClick={()=>this.setState({readmoreselected:index})}>
                                Read More
                            </span>
                        </TableCell>
                    }
                    <TableCell>{val.jadwal}</TableCell>
                    <TableCell>{val.sutradara}</TableCell>
                    <TableCell>{val.genre}</TableCell>
                    <TableCell>{val.durasi}</TableCell>
                    <TableCell>
                        <button className='btn btn-outline-primary mr-3'>Edit</button>
                        <button className='btn btn-outline-danger'>Delete</button>
                    </TableCell>
                </TableRow>
            )
        })
    }

    render() {
        return (
            <div className='mx-3'>
                <Modal isOpen={this.state.modaladd} toggle={()=>this.setState({modaladd:false})}>
                    <ModalHeader>
                        Add Data
                    </ModalHeader>
                    <ModalBody>
                        <input type="text" ref='title'  placeholder='title' className='form-control mt-2'/>
                        <input type="text" ref='image' placeholder='image'className='form-control mt-2'/>
                        <input type="text" ref='sinopsis'  placeholder='sinopsis' className='form-control mt-2 mb-2'/>
                        Jadwal:
                        <input type="checkbox"  ref='jadwal0'/> <span className='mr-2'>12.00</span> 
                        <input type="checkbox"  ref='jadwal1'/><span className='mr-2'>14.00</span> 
                        <input type="checkbox"  ref='jadwal2'/><span className='mr-2'>16.00</span> 
                        <input type="checkbox"  ref='jadwal3'/><span className='mr-2'>18.00</span> 
                        <input type="checkbox"  ref='jadwal4'/><span className='mr-2'>20.00</span> 
                        <input type="text"  ref='sutradara' placeholder='sutradara' className='form-control mt-2'/>
                        <input type="number"  ref='durasi' placeholder='durasi' className='form-control mt-2'/>
                        <input type="text" ref='genre' placeholder='genre' className='form-control mt-2'/>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={this.onSaveAddDataClick}>Save</button>
                        <button onClick={()=>this.setState({modaladd:false})}>Cancel</button>
                    </ModalFooter>
                </Modal>
                <Fade>
                    <button className='btn btn-success' onClick={()=>this.setState({modaladd:true})}> add Data</button>
                    <Table size='small' >
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Judul</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Sinopsis</TableCell>
                                <TableCell>Jadwal</TableCell>
                                <TableCell>Sutradara</TableCell>
                                <TableCell>Genre</TableCell>
                                <TableCell>Durasi</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.renderMovies()}
                        </TableBody>
                    </Table>
                </Fade>
            </div>
        );
    }
}
 
export default ManageAdmin;