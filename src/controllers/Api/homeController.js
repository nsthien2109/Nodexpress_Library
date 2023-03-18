let getHomePage = (req, res) => {
    return res.status(200).json({
        status : "OK", 
        title : "This is home page"
    })
}


export default {
    getHomePage
}