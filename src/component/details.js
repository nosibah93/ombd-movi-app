import React, { useEffect, useState } from 'react';
import { 
    Row, 
    Col, 
    Tag, 
    Typography,
    Card
} from 'antd';
import 'antd/dist/antd.css';
const API_KEY = '63d21713';
const { Meta } = Card;
const TextTitle = Typography.Title;
const ColCardBox = ({Title, imdbID, Poster, Type, ShowDetail, DetailRequest, ActivateModal}) => {

    const clickHandler = () => {

        // Display Modal and Loading Icon
        ActivateModal(true);
        DetailRequest(true);

        fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(response => {
            DetailRequest(false);
            ShowDetail(response);
        })
        .catch(({message}) => {
            DetailRequest(false);
        })
    }

    return (
        <Col style={{margin: '20px 0'}} className="gutter-row" span={4}>
            <div className="gutter-box">
                <Card
                    style={{ width: 200 }}
                    cover={
                        <img
                            alt={Title}
                            src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster}
                        />
                    }
                    onClick={() => clickHandler()}
                >
                    <Meta
                            title={Title}
                            description={false}
                    />
                    <Row style={{marginTop: '10px'}} className="gutter-row">
                        <Col>
                            <Tag color="magenta">{Type}</Tag>
                        </Col>
                    </Row>
                </Card>
            </div>
        </Col>
    )
}


const MovieDetail = ({Title, Poster, imdbRating, Rated, Runtime, Genre, Plot}) => {
    return (
        <Row>
            <Col span={11}>
                <img 
                    src={Poster === 'N/A' ? 'https://placehold.it/198x264&text=Image+Not+Found' : Poster} 
                    alt={Title} 
                />
            </Col>
            <Col span={13}>
                <Row>
                    <Col span={21}>
                        <TextTitle level={4}>{Title}</TextTitle></Col>
                    <Col span={3} style={{textAlign:'right'}}>
                        <TextTitle level={4}><span style={{color: '#41A8F8'}}>{imdbRating}</span></TextTitle>
                    </Col>
                </Row>
                <Row style={{marginBottom: '20px'}}>
                    <Col>
                        <Tag>{Rated}</Tag> 
                        <Tag>{Runtime}</Tag> 
                        <Tag>{Genre}</Tag>
                    </Col>
                </Row>
                <Row>
                    <Col>{Plot}</Col>
                </Row>
            </Col>
        </Row>
    )
}

export{
    ColCardBox,
     MovieDetail
}

 