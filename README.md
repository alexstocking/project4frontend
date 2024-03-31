# Project 4 ReadMe - Django/React Full Stack Application


## Description

Our fourth project was the culmination of the previous 12 weeks of learning. We were challenged to make a full stack application using a combination of a React frontend and Django backend. This was my first experience with Python and I enjoyed learning a new programming language. I decided to make an ecommerce site for my wife’s business, Sage and Whistle. I wanted to try to create a site that would match the requests she had, both feature wise and her stylistic choices. The user needed to be able to log in and be able to view and customise products, or make custom requests that my wife would be able to see. She also asked for a wish list for each user. The site had to be CRUDable (create, read, update and delete) and the backend had to use postgreSQL for the database. 


## Deployment link

Netlify Frontend: https://sageandwhistle.netlify.app/


## Getting Started/Code Installation

GitHub Frontend: https://github.com/alexstocking/project4frontend

GitHub Backend: https://github.com/alexstocking/project4backend



## Timeframe & Working Team (Solo/Pair/Group)

We had around a week to complete the project, starting Thursday afternoon and finishing the following Friday. It was a solo project, and I wanted to work through many of the challenges I knew I would run into myself so I had very minimal assistance from my instructors.


## Technologies Used

I used Django and React to create the backend and frontend respectively. This also included using HTML, CSS, JavaScript and Python to add full functionality for the application. We used postgreSQL to create the database. I used Netlify to deploy the frontend and Railway to deploy the backend. 


## Brief
Your App Must:
☐ Be a full-stack React/Django application.
☐ Connect to and perform data operations on a PostgreSQL database (the default SQLLite3 database is not acceptable).
☐ If consuming an API (OPTIONAL), have at least one data entity (Model) in addition to the built-in User model. The related entity can be either a one-to-many (1:M) or a many-to-many (M:M) relationship.
☐ If not consuming an API, have at least two data entities (Models) in addition to the built-in User model. It is preferable to have at least one one-to-many (1:M) and one many-to-many (M:M) relationship between entities/models.
☐ Have full-CRUD data operations across any combination of the app's models (excluding the User model). For example, creating/reading/updating posts and creating/deleting comments qualifies as full-CRUD data operations.
☐ Authenticate users using Django's built-in authentication.
☐ Implement authorization by restricting access to the Creation, Updating & Deletion of data resources using the login_required decorator in the case of view functions; or, in the case of class-based views, inheriting from the LoginRequiredMixin class.
☐ Be deployed online. Presentations must use the deployed application.


## Planning

I used excalidraw to draw up and plan my different models and how they would interact with each other (linked below). This was my main planning document that I added features to.

https://excalidraw.com/#json=1AviKNBzYKGzoM8wv6t7E,o8DidB8jbWAwDaaY1lXZ7g



## Build/Code Process

I will split my build process into days for ease of reading and tracking the progression of the project. I started the project on Thursday, and finished it the following Friday.

### Day 1 (Thursday): 
I spent the afternoon conceptualising the idea and beginning my planning process on how I wanted the site to look and what models would be needed on my backend. 

### Day 2 (Friday): 
I continued the planning process on Friday morning, creating my excalidraw and mapping out the functions I needed. I spent the rest of the day setting up the React frontend and Django backend, as well as getting the postgreSQL database ready to use. I also set up the django rest framework and started making end points that my frontend would be able to connect to.

### Day 3 (Monday): 
We spent Monday morning having tutorials on how to create authentication using the Django user model and connecting it to our React frontend. I spent Monday afternoon implementing it within my project, creating backend urls for logging in, logging out and signing up: 


    path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
    path('logout/', views.LogoutView.as_view(), name ='auth_logout'),
    path('signup/', views.SignUpView.as_view(), name ='auth_register'),

I created a SignUp View in my views.py to add new users to the database. I used this as a basis for other views I made later such as my edit account view and new request view. Here is my signup view: 


    class SignUpView(APIView):
      def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        password = request.data.get('password')


        try:
            new_user = User.objects.create(username=username, email=email, first_name=first_name, last_name=last_name)
            new_user.set_password(password)
            new_user.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
       

This uses the default user model that Django comes with. It also saves the password differently. On the frontend I used the access token being in the local storage of that user to define if a user was logged in and to pull the information.

### Day 4 (Tuesday): 
With users now able to sign up and log in, I created the products page, populating the product with some dummy products for testing. I used a product card component in which the information would be dynamically generated. It would iterate over each product in my database, adding as many product cards to the product page as needed. I then created the individual product pages using the id of the product in the url. I added a user conditional to display the add to cart/wishlist buttons if a user was logged in. 


        <div className="font">
        <Card>
            <div className="image-container" style={{ height: "22vh", overflow: "hidden"}}>
              <Link to={`/products/${id}`} style={{ textDecoration: 'none'}}><Card.Img variant="top" src={image} alt={name} style={{ objectFit: "cover", height: "100%", width: '100%'}}/></Link>
            </div>
            <Link to={`/products/${id}`} style={{ textDecoration: 'none'}}><Card.Body style={{color: 'black'}}>
                <Card.Title>{name}</Card.Title>
                <Card.Text><strong>{formattedPrice}</strong></Card.Text>
            </Card.Body></Link>
              {user ? (
            <Card.Footer style={{lineHeight: '0.5em'}}>
               
                <Button variant="dark" onClick={handleAddToCart} >Add to Cart</Button> &nbsp;
                <Button variant="dark" onClick={handleAddToList} >Add to Wish List</Button> &nbsp;
            </Card.Footer>
              ) : (
                <></>
              )}
        </Card>
        {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
       
        </div>

At the bottom of this snippet you can see the Pop up I used. This was a React component I created to appear at the bottom right of the screen when ‘add to cart’ or ‘add to wish list’ was clicked.

### Day 5 (Wednesday): 
I spent Wednesday morning adding the custom request features. Users could submit a request that my wife would be able to view on the backend and it would be linked to that user. This was a form that connected to my request view on the backend (similar to my sign up view). I then implemented the ability to view your account details on the frontend, along with the user’s requests. These can be edited as well with an edit request page having the fields populated already with that request’s information.


Here you can see the account page of a test account I made with a test request. The requests can be fully edited through this page.

### Day 6 (Thursday): 
I spent all of Thursday creating the shopping cart and wishlist functionalities. I connected the user to their specific carts by requesting information on the carts and then matching the users id to that of the users id on the specific cart using the filter function.

    useEffect(() => {
        getShoppingCartProducts();
        console.log(userCart)
    // eslint-disable-next-line
    }, []);
   
    const userCart = carts.filter(cart => cart.user === user.id);



This then allowed me to display everything that was in that user’s cart on the shopping cart page, as well removing items or adding custom requests to the products within the cart. I also calculated the total price of the products within the cart, creating a receipt for the user to view. I then copied this for the wishlist page (except for the receipt). Users can add items straight into their cart from their wish list. 

I spent Thursday afternoon and evening styling the website in the way my wife wanted it to be styled. I finished the Nav Bar and the footer, adding the appropriate ‘Contact Us’ links to it. I also managed to make sure the footer stayed at the bottom of the page, regardless of how long the page was. I then populated the product database with the correct products and finished the about me page.

### Day 7 (Friday): 
I spent most of Friday morning finishing the home page and then deploying the backend and frontend. I added a slider of product images on an intervalled time. This creates a nice presentation of the products when the user first loads up the page. I used Slider from react-slick to create this:



    export default function HomePage() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 5000,
            slidesToShow: 3, // Adjust the number of slides shown at once
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000, // Set to true for autoplay
            responsive: [
                {
                    breakpoint: 768, // Adjust breakpoints for responsive design
                    settings: {
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                    },
                },
            ],
        };

It also reduces the amount of pictures shown based on the size of the screen.

I then presented the project on Friday afternoon.


## Challenges

The first challenge was authentication. I had a lot of trouble connecting the Django user model to the React frontend, but was able to do it eventually with the supported tutorials I mentioned in the build guide. 

Because of the importance of the user and it being registered by the frontend to dynamically show features of the site and that user’s information, I had some trouble reading the user information on the frontend. I realised I wasn’t reading the access token correctly, and fixing this allowed a lot of the features I wanted to fall into place. 


## Wins

I was very pleased with the styling of the website and the professional feel it has. The Navbar and footer took a surprising amount of time to get it looking exactly how I wanted but it felt rewarding once finished. The sliding images is also a feature I was glad I implemented.

Working through the backend endpoints independently and adapting the sign up view to work with each future view I needed (editing account, custom requests etc.) was something I was really proud of, and I felt like it deepened my understanding of Python.

The website also came together at the end of the week quite quickly. I was slightly worried I wasn’t going to get it all done by Friday because of the various challenges I ran into, but was very proud of the hard work and motivation I put into the site as a whole.



## Key Learnings/Takeaways

Getting over your blockers efficiently can help other things fall into place quite quickly (for example the user auth being a blocker meant other things couldn’t be worked on till that was finished, but once ready, other things were finished a lot quicker than I thought)
Styling a website on someone else's requests is definitely a different experience to relying on your own creativity. It also challenged me to be creative with bootstrap and CSS when certain stylistic features were requested.
That a full stack application of React and Django can work very well. The Django backend framework is much easier to set up and use than other JavaScript backends I have used previously.


## Bugs

Currently a picture is missing on the about me page. It is a headshot of my wife. This is because the source of the picture expired, so I need to upload the picture to imgur and redeploy the site.

There are some funky visual bugs on mobile when viewing the nav bar or home page.


## Future Improvements

Implementing a forgot my password feature for users.
Making the site entirely mobile friendly.
Expanding the custom request features.


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

