# Database

The database postgres was chosen and you can setup the database tables in docker mapping the `init.sql` to inside the container. the `data` folder will map all the data to outside the container to be preserved if the container be destroyed.

```
postgres
│
└── data
│
└── init.sql
```