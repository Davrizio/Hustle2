module.exports = {
  
  getIndex: (req, res) => {
    console.log("getIndex", {messages: req.flash('errors')})
    res.render("index.ejs", { messages: req.flash('errors') });
  },
};
