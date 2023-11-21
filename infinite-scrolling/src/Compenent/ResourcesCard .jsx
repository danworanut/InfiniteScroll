import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Grid, Card as MaterialUICard, CardContent, Typography } from '@mui/material';

const ResourcesCard = () => {
  const [codingResources, setCodingResources] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.sampleapis.com/codingresources/codingResources');

      if (response.data.length > 0) {
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
    <div>
      <h1>Coding Resources</h1>
      <InfiniteScroll
        dataLength={codingResources.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Grid container spacing={3}>
          {codingResources.map((resource, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MaterialUICard style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h6" component="div">
                    {resource.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    URL: {resource.url}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Types: {resource.types.join(', ')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Topics: {resource.topics.join(', ')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Levels: {resource.levels.join(', ')}
                  </Typography>
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
