import '../css/Reviews.css'
const Reviews = () => {

    return ( 
        <div className="reviewContainer">
            <div className="reviewForm">
            <div className="heading">
                <h2>Share Your Experience</h2>
            </div>
                 <div className="upload">
                    <input type="file" name="upload" />
                 </div>
                 <div className="reviewsInput">
                    <input type="text" name="name" placeholder="Your Name"/>
                    <textarea name="fBack" placeholder="Your Feedback"/>
                 </div>
                 <div className="submit">
                    <p>Submit</p>
                 </div>
            </div>
            
        </div>
       
     );
}
 
export default Reviews;