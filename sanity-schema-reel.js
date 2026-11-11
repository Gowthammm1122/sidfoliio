/**
 * Sanity Schema Definition: Reel
 * Place this in your Sanity Studio `schemas/reel.js` or `schemaTypes/reel.ts`
 */
export default {
  name: 'reel',
  title: 'Instagram Reel / Video Edit',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title / Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'caption',
      title: 'Caption & Hashtags',
      type: 'text',
      rows: 4,
    },
    {
      name: 'videoFile',
      title: 'Video File Asset',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload MP4, WebM, or MOV video file directly to Sanity',
    },
    {
      name: 'videoUrl',
      title: 'External Video URL (Optional)',
      type: 'url',
      description: 'Optional external URL if not uploading via Sanity file asset',
    },
    {
      name: 'coverImage',
      title: 'Cover / Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'coverUrl',
      title: 'Cover Image URL (Optional)',
      type: 'url',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Commercial', value: 'Commercial' },
          { title: 'Motion Graphics', value: 'Motion Graphics' },
          { title: 'Color Grade', value: 'Color Grade' },
          { title: 'Fashion & Lifestyle', value: 'Fashion' },
          { title: '3D & VFX', value: '3D & VFX' },
          { title: 'Shorts & TikTok', value: 'Shorts' },
        ],
      },
      initialValue: 'Commercial',
    },
    {
      name: 'client',
      title: 'Client / Brand',
      type: 'string',
    },
    {
      name: 'views',
      title: 'View Count (e.g. 142.8K)',
      type: 'string',
      initialValue: '12.4K',
    },
    {
      name: 'likes',
      title: 'Likes Count (e.g. 14.2K)',
      type: 'string',
      initialValue: '1.2K',
    },
    {
      name: 'commentsCount',
      title: 'Comments Count (e.g. 142)',
      type: 'string',
      initialValue: '86',
    },
    {
      name: 'audio',
      title: 'Audio / Sound Track Name',
      type: 'string',
      initialValue: 'Original Audio - Siddarth',
    },
    {
      name: 'isFeatured',
      title: 'Feature on Homepage (Selected Works)',
      type: 'boolean',
      initialValue: true,
      description: 'When enabled, this reel will be showcased in the homepage Selected Works section',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
};

