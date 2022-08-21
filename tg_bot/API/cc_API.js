module.exports = {
  getCAD_HKD: async () => {
    const requestOptions = {
      method: 'GET',
    };
  
    try {
      const res = await fetch(`http://api:3000/CAD_HKD`, requestOptions);
      if (res.ok){
        const data = await res.json();
        return data.rate;
      }
      return false;
    } catch (err) {
      console.log('--- Error occured ---');
      console.log(err);
      return false;
    }
  },
};