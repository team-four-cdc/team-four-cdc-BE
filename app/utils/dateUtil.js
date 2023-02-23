function dateUtil() {
  function convertDateToMillisecond(date) {
    // The request was unacceptable, often due to missing a required parameter.
    const newDate = new Date(date);
    const milliseconds = newDate.getTime();

    return milliseconds;
  }

  return {
    convertDateToMillisecond
  };
}

module.exports = dateUtil;
