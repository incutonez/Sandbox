# Overview

I wanted to test out various data modeling/validation packages.  The main intent is to have some sort of BaseModel that all models extend from, ideally through classes.  Also ideally able to generate types from an OpenAPI spec, so I don't have to double define properties.

# TypeBox

[TypeBox](https://github.com/sinclairzx81/typebox) seemed rather promising, but once I started using it, it seemed like it's strictly meant as a validation library and not something that can be incorporated into classes, per this [discussion](https://github.com/sinclairzx81/typebox/discussions/712).  I don't think the objects that are returned from it are ever supposed to be mutated, or maybe I was missing some way of doing that, but it didn't work well with Vue's reactivity.
