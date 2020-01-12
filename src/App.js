import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      search: '',
      hits: [],
      hitsAudio: [],
      test: ''
    }

    this.updateSearch = this.updateSearch.bind(this)
    this.runIt = this.runIt.bind(this)
    this.getAudio = this.getAudio.bind(this)
    this.pressedEnter = this.pressedEnter.bind(this)
  }

  updateSearch(e) {
    this.setState({
      search: e.target.value
    })
  }

  runIt() {

    axios({
      "method":"GET",
      "url":"https://mashape-community-urban-dictionary.p.rapidapi.com/define",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"mashape-community-urban-dictionary.p.rapidapi.com",
      "x-rapidapi-key":"454a90f8afmshe03e7bd4efdce75p1abc73jsn2df2e9ddc1e5"
      },"params":{
      "term":this.state.search
      }
    })
    .then((response)=>{
      this.setState({
        hits: response.data.list
      })
    })
    .catch((error)=>{
      console.log(error)
    })
    // WORKING ON GETTING ALL AUDIO DATA AFTER RECIEVING URBANDICTIONARY DATA
      // .then(() => {
      //   const urbanHits = [...this.state.hits]
      //   console.log('urbanHits: ', urbanHits)
      //   const urbanHitsAudio = urbanHits.map((hit, i) => {
      //       console.log('hit.example: ', hit.example, 'i: ', i)
      //       axios({
      //         "method":"GET",
      //         "url":"https://voicerss-text-to-speech.p.rapidapi.com/",
      //         "headers":{
      //         "content-type":"application/octet-stream",
      //         "x-rapidapi-host":"voicerss-text-to-speech.p.rapidapi.com",
      //         "x-rapidapi-key":"454a90f8afmshe03e7bd4efdce75p1abc73jsn2df2e9ddc1e5"
      //         },"params":{
      //         "r":"0",
      //         "c":"mp3",
      //         "f":"16khz_16bit_stereo",
      //         "b64":"true",
      //         "src": hit.example,
      //         "hl":"en-us",
      //         "key":"7ef4e4a082bb4af9ad1277bc840b0f45"
      //         }
      //       })
      //       .then((response)=>{
      //         console.log(response)
      //         // this.setState({test: response.data}, () => {
      //         //   this.refs.audio.pause();
      //         //   this.refs.audio.load();
      //         //   this.refs.audio.play();
      //         // })
      //         // hitsAudio.push(response.data)
      //         return response.data
      //       })
      //       .catch((error)=>{
      //         console.log(error)
      //       })
      //     })

      //   console.log('urbanHitsAudio: ', urbanHitsAudio)
      //   // urbanHitsAudio().then(this.setState({
      //   //   hitsAudio: [...urbanHitsAudio]
      //   // }))
        
      // })
  }

  getAudio(hit) {
    console.log(hit.example)
    axios({
      "method":"GET",
      "url":"https://voicerss-text-to-speech.p.rapidapi.com/",
      "headers":{
      "content-type":"application/octet-stream",
      "x-rapidapi-host":"voicerss-text-to-speech.p.rapidapi.com",
      "x-rapidapi-key":"454a90f8afmshe03e7bd4efdce75p1abc73jsn2df2e9ddc1e5"
      },"params":{
      "r":"0",
      "c":"mp3",
      "f":"16khz_16bit_stereo",
      "b64":"true",
      "src": hit.example,
      "hl":"en-us",
      "key":"7ef4e4a082bb4af9ad1277bc840b0f45"
      }
    })
    .then((response)=>{
      console.log(response)
      this.setState({test: response.data}, () => {
        this.refs.audio.pause();
        this.refs.audio.load();
        this.refs.audio.play();
      })
      return response.data
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  pressedEnter(e) {
    e.key === 'Enter' && this.runIt()
  }

  render() {
   
    let hits = []
    hits = [...this.state.hits]

    const searchHits = hits.map((hit, i) => {
      const uniqueKey = new Date().valueOf() + i;

      return (
        <li key={uniqueKey}>
          <p><span className="definition">Definition: </span>{hit.definition}</p>
          <p><span className="example">Example: </span>{hit.example}</p>
          <button className="btn btn-success" onClick={() => {this.getAudio(hit)}}>Volume up and click me please</button>
          <audio ref="audio" key="search">
            <source src={this.state.test} />
            Your browser does not support the audio element.
          </audio>
          <hr />
        </li>
      )
    })

    return (
      <div className="App container">
        <div className="row justify-content-center">
          <div className="card mt-5 text-white bg-info">
            <h1 className="card-header">The Urban Speaker</h1>
            <h4 className="card-header">Gain the skills to become an "urban speaker" today!</h4>
            <div className="card-body">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="search" onChange={this.updateSearch} onKeyPress={this.pressedEnter}/>
                <div className="input-group-append">
                  <button className="btn btn-warning" type="button" id="button-addon2" onClick={this.runIt}>submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <h1 className="row justify-content-center">{this.state.search}</h1>
        <div className="row">
          <ol>
            {searchHits}
          </ol>
        </div>
      </div>
    );
  }
}

export default App;

// //TEXT TO SPEECH
    // axios({
    //   "method":"GET",
    //   "url":"https://voicerss-text-to-speech.p.rapidapi.com/",
    //   "headers":{
    //   "content-type":"application/octet-stream",
    //   "x-rapidapi-host":"voicerss-text-to-speech.p.rapidapi.com",
    //   "x-rapidapi-key":"454a90f8afmshe03e7bd4efdce75p1abc73jsn2df2e9ddc1e5"
    //   },"params":{
    //   "r":"0",
    //   "c":"mp3",
    //   "f":"16khz_16bit_stereo",
    //   "b64":"true",
    //   "src": this.state.search,
    //   "hl":"en-us",
    //   "key":"7ef4e4a082bb4af9ad1277bc840b0f45"
    //   }
    //   })
    //   .then((response)=>{
    //     this.setState({test: response.data}, () => {
    //       this.refs.audio.pause();
    //       this.refs.audio.load();
    //       this.refs.audio.play();
    //     })
    //   })
    //   .catch((error)=>{
    //     console.log(error)
    //   })


    // //IMDB
    // axios({
    //     "method":"GET",
    //     "url":"https://movie-database-imdb-alternative.p.rapidapi.com/",
    //     "headers":{
    //     "content-type":"application/octet-stream",
    //     "x-rapidapi-host":"movie-database-imdb-alternative.p.rapidapi.com",
    //     "x-rapidapi-key":"454a90f8afmshe03e7bd4efdce75p1abc73jsn2df2e9ddc1e5"
    //     },"params":{
    //     "page":"1",
    //     "r":"json",
    //     "s": this.state.search
    //     }
    //     })
    //     .then((response)=>{
    //       console.log(response.data.Search)
    //       this.setState({
    //         hits: [...response.data.Search]
    //       })
    //     })
    //     .then(() => {
    //       const hits = this.state.hits
    //       hits.forEach()
    //     })
    //     .catch((error)=>{
    //       console.log(error)
    //     })


    // IMDB JSX render()
    // const searchHits = hits.map((hit, i) => {
    //   return (
    //     <div className="hit card" key={i + hit.imdbID}>
    //       <div className="card-body">
    //         <p>{hit.Title}</p>
    //         <img src={hit.Poster} width="200px" height="250px"></img>
    //       </div>
    //       <div className="card-footer">
    //       <button>this one</button>
    //       </div>
    //     </div>
    //   )
    // })