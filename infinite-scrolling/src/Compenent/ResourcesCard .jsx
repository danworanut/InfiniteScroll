import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid, Card as MaterialUICard, CardContent, Typography } from '@mui/material';
import { Button } from '@mui/material';

const ResourcesCard = () => {
  const [codingResources, setCodingResources] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.sampleapis.com/codingresources/codingResources');

      if (response.data.length > 4) {
        setCodingResources([...codingResources, ...response.data]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 
  
  return (
    <div style={{ padding: '20px'}}>
      <h1 style={{ padding: '20px', textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>Coding Resources</h1>
      <InfiniteScroll
        dataLength={codingResources.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<Typography  variant="h5" color="#00000" style={{ ontWeight: 'bold',textAlign: 'center', margin: '50px 0',fontFamily: 'Poppins, sans-serif' }}>Loading...</Typography>}
      >
        <Grid container spacing={5} >
          {codingResources.map((resource, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index} style={{ margin: '16px 0' }}>
              <MaterialUICard style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' , fontFamily: 'Poppins, sans-serif' }}>
                  <div>
                  <Typography variant="body2" color="#C06C84" style={{ margin: '9px 0',fontSize: '12.5pt' , fontWeight: 'bold', fontFamily: 'Poppins, sans-serif' }}>
                      {resource.topics.join(', ')}
                    </Typography>
                    <Typography variant="h5"  component="div" style={{ fontWeight: 'bold' ,fontFamily: 'Poppins, sans-serif'  }}>
                      {resource.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginTop: '8px', fontFamily: 'Poppins, sans-serif' }}>
                      Types: {resource.types.join(', ')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Levels: {resource.levels.join(', ')}
                    </Typography>
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <Button variant="contained" color="primary"  style={{ fontFamily: 'Poppins, sans-serif'}}  href={resource.url} target="_blank">
                      Visit Website
                    </Button>
                  </div>
                </CardContent>
              </MaterialUICard>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export default ResourcesCard;
