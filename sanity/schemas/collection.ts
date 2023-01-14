import {defineField, defineType} from 'sanity'
 
export default defineType({
 name: 'collection',
 title: 'Collection',
 type: 'document',
 fields: [
   defineField({
     name: 'title',
     description: 'NFT Drop Title',
     title: 'Title',
     type: 'string',
   }),
   defineField({
     name: 'description',
     title: 'Description',
     type: 'string',
   }),
   defineField({
     name: 'collectionName',
     title: 'NFT Collection Name',
     type: 'string',
   }),
   defineField({
     name: 'address',
     title: 'Address',
     type: 'string',
   }),
   defineField({
     name: 'slug',
     title: 'Slug',
     type: 'slug',
     options: {
       source: 'title',
       maxLength: 96,
     },
   }),
   defineField({
     name: 'author',
     title: 'Author',
     type: 'reference',
     to: {type: 'author'},
   }),
   defineField({
     name: 'mainImage',
     title: 'Main image',
     type: 'image',
     options: {
       hotspot: true,
     },
   }),
   defineField({
     name: 'previewImage',
     title: 'Preview image',
     type: 'image',
     options: {
       hotspot: true,
     },
   }),
 ],
})
