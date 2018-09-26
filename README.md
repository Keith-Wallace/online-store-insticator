# online-store-insticator
Single page application showcasing a new online store utilizing React/Redux or vanilla JS.

### So, What Technology are we Using?
* **Webpack** to help configure and bundle all our `.js`, `.scss`, etc. files.
* **React** to create our UI components for layout and fetch the `store_items.json` data to allow us to view our online store content and add/remove/submit our shopping cart. No backend is in place so any browser refresh will reset all data.
* **Sass** Css preprocessor to clean and DRY up our css code.

### What can we Do?
What the UI shows us:
  * Store Items:
    * Shows the name, image, price, remaining quantity and it's image (A placeholder image will appear if it's original image fail to load).
  * Shopping cart:
    * You can add or remove items from the cart and will revert the items quantity remaing.
    * Toggle to add/remove the quanity of item(s) in the shopping care. Buttons are disabled when remaining quaintity is `0`. it will also remove the item from the cart if you remove all instances of the item.
    * After confirming purchase, all items in the cart are cleared and the items remaing quantity retains it's number.
  * Responsive Layout

### Takeaways
* Would love to get away from using the current state managment and use Redux library instead. Still learing and once I get the hang of it i'll refactor this app.
* Pull out and DRY up the messy functions (`addItemToCart`, `updateQuantity`, `deleteCartItem`, `emptyCart`, and `confirmPurchase`) into a nice and tidy "helper method" library. Another good refactor candidate when I have more open time.
* Backend? Sure would be a nice full stack MVP if we can store and update our store data!

### I Wanna see this Thing!
Two ways:
1. You can `git clone` this repo to your local machine and `run npm install` in your terminal. After all dependend packages are installed run `npm run dev` and it will launch the application inside the browser.
2. Live on [Heroku](https://online-store-insticator-kw.herokuapp.com/)

Thank you!!
