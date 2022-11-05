# Notes

Anything that gets `awaited` in your loader you can think of critical code. Why?
Because if you `await`, you're suspending execution of the code that lives below it.

Without streaming, you'd have to make the API call from the client

### References

- https://github.com/remix-run/remix/blob/deferred/docs/pages/deferred.md
