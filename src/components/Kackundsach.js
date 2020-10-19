import React from "react";
import axios from "axios";
import * as  xml2js from 'xml2js';

class Kackundsach extends React.Component {


    componentDidMount() {
        this.getPodcast();
    }

    getPodcast = async() => {
        const res = await axios.get(`https://steadyhq.com/rss/kackundsach?auth=c48439e3-2c6b-4507-af4d-b57d22b8c870`);

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(res.data,"text/xml");
        console.log(xmlDoc);
    };

    render() {
        var test = xml2js();

        return (
            <div>
                <h1>Kack und Sach</h1>
            </div>
        )
    }
}

export default Kackundsach;