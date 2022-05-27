const url = 'https://meal-db-api.herokuapp.com';

export const getAllMeals = async () => {
    let isLoading = true
    try {
        const res = await fetch(`${url}/search/all`);
        if(!res.ok) throw new Error('Data not fetched');
        const data = await res.json();
        return data
    } catch (err) {
        console.warn(err)
    } finally {
        isLoading = false;
    }
}

export const getMealByName = async (name) => {
    let isLoading = true
    try {
        const res = await fetch(`${url}/search/meal?name=${name}`);
        if(!res.ok) throw new Error('Data not fetched');
        const data = await res.json();
        return data
    } catch (err) {
        console.warn(err)
    } finally {
        isLoading = false;
    }
}

export const getRandomMeals = async () => {
    let isLoading = true
    try {
        const res = await fetch(`${url}/search/meal/random`);
        if(!res.ok) throw new Error('Data not fetched');
        const data = await res.json();
        return data
    } catch (err) {
        console.warn(err)
    } finally {
        isLoading = false;
    }
}

export const getIngredients = async (include='',exclude='') => {
    let isLoading = true
    let res
    try {
        if (exclude === '[""]'){
            res = await fetch(`${url}/search/ingredients?include=${include}`);
        } else {
            res = await fetch(`${url}/search/ingredients?include=${include}&exclude=${exclude}`);
        }
        
        if(!res.ok) throw new Error('Data not fetched');
        const data = await res.json();
        return data
    } catch (err) {
        console.warn(err)
    } finally {
        isLoading = false;
    }
}