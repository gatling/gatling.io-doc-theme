# gatling.io/docs Theme

## Dev mode

### Quick (docker-compose)

```console
docker-compose up
```

Then, go to [http://localhost:1313](http://localhost:1313)


### Local

```console
hugo mod npm pack
cd exampleSite
hugo server --buildDrafts
```

Then, go to [http://localhost:1313](http://localhost:1313)

## Page weight

The weight indicates which page comes first in the sidebar. We use this system: SBXX0 where:
- S: corresponds to the sidenav section number (begins at 1)
- B: corresponds to the branch number (set to 0 if not in a branch)
- XX: place inside the current group of pages (begins at 1)
