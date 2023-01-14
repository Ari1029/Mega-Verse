import {createCurrentUserMethod, createClient} from 'next-sanity'
import createImageBuilder from '@sanity/image-url'

export const defineConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2021-10-21',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    useCdn: process.env.NODE_ENV === 'production'
}

export const urlFor = (source)=>{
    createImageBuilder(defineConfig).image(source);
}
export const sanityClient = createClient(defineConfig);
