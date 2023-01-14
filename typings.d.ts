interface Image{
    asset:{
        url: string
    }
}

export interface Author{
    _id: string
    name: string
    address: string
    slug:{
        current: string
    }
    image: Image
    bio: string
}

export interface Collection{
    _id: string
    title: string
    description: string
    collectionName: string
    address: string
    slug:{
        current: string
    }
    author: Author
    mainImage: Image
    previewImage: Image
}