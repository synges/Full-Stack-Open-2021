const blogRouter = require('express').Router();
const { request, response } = require('express');
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});
	response.json(blogs);
});

blogRouter.post('/', async (request, response, next) => {
	const blog = new Blog(request.body);
	try {
		const result = await blog.save();
		response.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

blogRouter.delete('/:id', async (request, response, next) => {
	try {
		await Blog.findByIdAndDelete(request.params.id);
		response.status(204).end();
	} catch (error) {
		next(error);
	}
});

blogRouter.put('/:id', async (request, response, next) => {
	const blog = {
		likes: request.body.likes,
	};

	try {
		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
			new: true,
		});
		response.json(updatedBlog);
	} catch (error) {
		next(error);
	}
});

module.exports = blogRouter;
