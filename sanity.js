import {createCurrentUserMethod, createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const defineConfig = {
    projectId: '9a8ni1f0',
    apiVersion: '2021-10-21',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    useCdn: process.env.NODE_ENV === 'production'
}

export const sanityClient = createClient(defineConfig);

export const urlFor = (source)=>{
    return imageUrlBuilder(defineConfig).image(source);
}

