# Overview

I wanted to test out various data modeling/validation packages.  The main intent is to have some sort of BaseModel that all models extend from, ideally through classes.  Also ideally able to generate types from an OpenAPI spec, so I don't have to double define properties.

# Class Validator

[Class Validator](https://github.com/typestack/class-validator) + [Class Transformer](https://github.com/typestack/class-transformer) is what I consider the "gold standard" at this point, and what I used to template these other packages against, so there's a strong bias towards this package.

Having said that, it allows you to use decorators, which feels more natural when coming from C# (or other strongly typed languages).  It seamlessly integrates with classes and allows you to create custom decorators.  There are some quirks, and the support for it has been waning, but the code has existed since 2016, so that might be a good testament to using classes.

# TypeBox

[TypeBox](https://github.com/sinclairzx81/typebox) seemed rather promising, but once I started using it, it seemed like it's strictly meant as a validation library and not something that can be incorporated into classes, per this [discussion](https://github.com/sinclairzx81/typebox/discussions/712).  I don't think the objects that are returned from it are ever supposed to be mutated, or maybe I was missing some way of doing that, but it didn't work well with Vue's reactivity.

# Zod

[Zod](https://github.com/colinhacks/zod) is very similar to TypeBox, like almost identical.  Admittedly, it does seem a bit more customizable, and the infer method seems very useful, but outside of that, basically the same as TypeBox.  If I had to choose between the two, I'd go with Zod.

# Yup
[Yup](https://github.com/jquense/yup) is basically another flavor of Zod and TypeScript.  They're all very similar, and I didn't actually implement this one because it looked the same.

# Review

In terms of npm downloads, TypeBox takes the crown... it was at ~9m weekly downloads.  Zod was at ~2.5m, Yup ~1.9m, and Class Validator ~600k.  So when it comes to support, it seems like TypeBox would be the best choice.

What I like about Class Validator is that you only have to define your properties once, and then the validation stacks on top of it, whereas with the other ones, you have to define the schema, and then the class that implements the interface.

Sure, you can forgo the class entirely and probably import methods or come up with some cutesy factory function, but that seems like we're trying to sidestep classes just because we don't like OOP anymore.
