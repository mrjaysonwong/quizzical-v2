import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className="loading">
      <ReactLoading type="spinningBubbles" color="#285fd6" />
      <p>Loading data...</p>
    </div>
  );
};

export default Loading;
