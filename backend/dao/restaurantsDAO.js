// create variable as a short hand refrence to the db
let restaurants

// create a class for RestaurantsDAO w/ methods
// first method is used to try to connect to the database
    //  if resturants variable is filled it will just return, if not it will await a connection from the db 
// second method used to get restruants data
    // first variables are used to format the response data
    // second variables are used to construct filters to pass the data through
// cursor variabkle is to determine how many results and page sof results are to be returned

export default class RestaurantsDAO {
    static async injectDB(conn) {
        if (restaurants) {
            return
        }
        try {
            restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
        } catch (err) {
            console.error(
                `Unable to establish a collection handle in restaurantsDAO: ${err}`,
                )
            }
        }
    static async getRestaurants({
         filters = null,
         page  = 0,
         restaurantsPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
              } else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } }
              } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
              }
        }

        let cursor

        try {
            cursor = await restaurants
            .find(query)
        } catch (err) {
            console.error(
                `unable to issue find command, ${err}`,
            )
            return { restaurantsList: [], totalNumRestaurants: 0 }
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(page * restaurantsPerPage)

        try {
            const restaurantsList = await displayCursor.toArray()
            const totalNumRestaurants = page === 0 ? await restaurants.countDocuments(query) : 0

            return { restaurantsList, totalNumRestaurants }
        } catch (err) {
            console.error(
                `unable to convert cursor to array or problem counting documents, ${err}`,
            )
            return { restaurantsList: [], totalNumRestaurants: 0 }

        }
    } 
}
