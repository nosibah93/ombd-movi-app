import React, { useEffect, useState } from 'react';
import { 
    Layout, 
    Row, 
    Card,  
    Spin, 
    Alert, 
    Modal, 
    Typography ,
    Tabs,
} from 'antd';
import 'antd/dist/antd.css';
import SearchBox from './component/search'
import {ColCardBox,MovieDetail} from './component/details'
import { useMediaQuery } from 'react-responsive'
const API_KEY = '63d21713';
const { Header, Content} = Layout;
const { Meta } = Card;
const TextTitle = Typography.Title;
const { TabPane } = Tabs;


const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 })
    return isDesktop ? children : null
  }
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
    return isTablet ? children : null
  }
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    return isMobile ? children : null
  }
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 768 })
    return isNotMobile ? children : null
  }
  

const Loader = () => (
    <div style={{margin: '20px 0', textAlign: 'center'}}>
        <Spin />
    </div>
)

function App() {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [q, setQuery] = useState('movie');
    const [activateModal, setActivateModal] = useState(false);
    const [detail, setShowDetail] = useState(false);
    const [detailRequest, setDetailRequest] = useState(false);


    useEffect(() => {

        setLoading(true);
        setError(null);
        setData(null);

        fetch(`http://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(response => {
            if (response.Response === 'False') {
                setError(response.Error);
            }
            else {
                setData(response.Search);
            }

            setLoading(false);
        })
        .catch(({message}) => {
            setError(message);
            setLoading(false);
        })

    }, [q]);

    
    return (
        
        <div className="App">
            <Desktop>Desktop or laptop</Desktop>
            <Tablet>Tablet</Tablet>
            <Mobile>Mobile</Mobile>
            <Default>Not mobile (desktop or laptop or tablet)</Default>
        
            <Layout className="layout">
                <Header>
                <h2 id='title1'>Movie</h2><h2 id='title2'>DB</h2><div id='search'>
                         <SearchBox searchHandler={setQuery} />
                        </div>
                
                </Header>
                <Tabs defaultActiveKey="1" onChange={console.log("hi")}>
                <TabPane tab='Movie' key="1">
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 500 }}>
                        <br /> 
                        <Row gutter={16} type="flex" justify="center">
                            { loading &&
                                <Loader />
                            }

                            { error !== null &&
                                <div style={{margin: '20px 0'}}>
                                    <Alert message={error} type="error" />
                                </div>
                            }
                            
                            { data !== null && data.length > 0 && data.map((result, index) => (
                                <ColCardBox 
                                    ShowDetail={setShowDetail} 
                                    DetailRequest={setDetailRequest}
                                    ActivateModal={setActivateModal}
                                    key={index} 
                                    {...result} 
                                />
                            ))}
                        </Row>
                    </div>
                    <Modal
                        title='Detail'
                        centered
                        visible={activateModal}
                        onCancel={() => setActivateModal(false)}
                        footer={null}
                        width={800}
                        >
                        { detailRequest === false ?
                            (<MovieDetail {...detail} />) :
                            (<Loader />) 
                        }
                    </Modal>
                </Content>
                </TabPane>
                </Tabs>
            </Layout>

        </div>
    );
}

export default App;


// import React from 'react';
// import './App.css';
// import Movie from './component/movie'

// function App() {
//   return (
//     <div>
//       <div>
//       <h2 id='title1'>Movie</h2><h2 id='title2'>DB</h2>
//       <div class="search-container">
//     <form action="">
//       <input type="text" placeholder="Search.." name="search" />
//       <button type="submit"><i class="fa fa-search"></i></button>
//     </form>
//   </div>
//     </div>
//     <hr />
//     <div class="topnav">
//   <a class="active" href="/">Movie</a>
//   <Movie />
//   <a href="#series">series</a>
// </div>

// </div>
//     )
//}
//   }
// export default App