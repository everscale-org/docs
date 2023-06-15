# GraphQL Block and Transaction Pagination: Best Practice 

## Introduction

Before the development of Blockchain API many developers formed a habit of implementing pagination via block and transaction collections, using fields such as `created_at`, `now`, `lt`, etc.

While it might seem more convenient and simple, this is a sub-optimal practice. In certain circumstances, such as periods of large loads and intensive sharding, it has been shown to lead to data loss.

[GraphQL Blockchain API](https://docs.evercloud.dev/reference/graphql-api/blockchain) was developed for this exact reason - to provide a reliable way of blockchain data pagination and prevent any potential data inconsistencies regardless of network load.

**Note**: Query Collections are a supported instrument and will remain so. However, they are intended and optimized primarily for tasks that are not critically dependent on data completeness, such as analytics.

## Blocks Pagination with Blockchain API

> **Note:** For Blockchain API documentation, refer [here](https://docs.evercloud.dev/reference/graphql-api/blockchain).
> 

Block pagination is based on the fact that all workchain blocks are committed into masterchain blocks in a specific order. The masterchain is ordered by `seq_no` and has only one thread. The pagination cursor thus divides all blockchain blocks into ranges between masterchain blocks and provides a complete selection.

Let’s look at the following sample:

```graphql
query {
  blockchain{
    blocks(
      master_seq_no_range: {
        start: 2660661
        end: 2670661
      }
          workchain:0
    ) {
      edges {
        node {
          workchain_id
          id
          shard
          seq_no
          hash
          file_hash
        }
            cursor
      }
          pageInfo{
            endCursor
          }
    }
  }
}
```

Here we specify **masterchain** blocks `seq_no` range.

Block `seq_no` numbers can be found on **block detail** pages in blockchain explorers, such as https://ever.live/ or https://everscan.io/. Examples: [here](https://ever.live/blocks/blockDetails?id=bf842cbe75ca9fa9c75d297f29b359b86174ad71af62b792b693e7861b052d7a) and [here](https://everscan.io/blocks/bf842cbe75ca9fa9c75d297f29b359b86174ad71af62b792b693e7861b052d7a).

We also specify that we want to paginate only `0` workchain blocks. To get only masterchain blocks, you can specify `-1`. If the workchain parameter is omitted, you will get all blocks from all workchains.

In the result shown below you can see cursor field in each edge object. The cursor value can be passed over to the next query for pagination. Or you can get the latest cursor for the result set in `PageInfo.endCursor` field.

```graphql
{
  "data": {
    "blockchain": {
      "blocks": {
        "edges": [
          {
            "node": {
              "workchain_id": 0,
              "id": "block/b4eb28c24a8b4f1fd57a644ee577b79ae69384482e0136014db6ef69a9219791",
              "shard": "5800000000000000",
              "seq_no": 3670226,
              "hash": "b4eb28c24a8b4f1fd57a644ee577b79ae69384482e0136014db6ef69a9219791",
              "file_hash": null
            },
            "cursor": "52899360053800d211a"
          },
...
          {
            "node": {
              "workchain_id": 0,
              "id": "block/8eba270b0b225cf03e3edf997fea70f29e58489dc6f30602ca18bf3a56d19101",
              "shard": "b800000000000000",
              "seq_no": 3671807,
              "hash": "8eba270b0b225cf03e3edf997fea70f29e58489dc6f30602ca18bf3a56d19101",
              "file_hash": null
            },
            "cursor": "52899360053806ff11d"
          }
        ],
        "pageInfo": {
          "endCursor": "52899360053806ff11d"
        }
      }
    }
  }
}
```

Now let’s get the next page of our range.

The following parameters will be used:

- `after/first` - shows `first` number of items `after` (not including) specified cursor value.
- `before/last`- shows `last` number of items `before` (not including) specified cursor value. This can be used for backward pagination.

In the following sample pagination is continued within the same `seq_no` range. The next 10 blocks after the last block in the previous query are displayed.

```graphql
query {
  blockchain{
    blocks(
      master_seq_no_range: {
        start: 2660661
        end: 2670661
      }
          after:"52899360053806ff11d"
          first:10
          workchain:0
    ) {
      edges {
        node {
          workchain_id
          id
          shard
          seq_no
          hash
          file_hash
        }
            cursor
      }
          pageInfo{
            endCursor
            hasNextPage
          }
    }
  }
}
```

`PageInfo` section here gets an additional parameter: `pageInfo.hasNextPage`

Its output (`true`/`false`) shows whether there is data for another page in the current `seq_no` range.

The result of the query looks like this:

```graphql
{
  "data": {
    "blockchain": {
      "blocks": {
        "edges": [
          {
            "node": {
              "workchain_id": 0,
              "id": "block/b313465a71e0e89977ef052a3ed56cb4969e5bf6eed857ec1fd89b0c4be401a0",
              "shard": "c800000000000000",
              "seq_no": 3661331,
              "hash": "b313465a71e0e89977ef052a3ed56cb4969e5bf6eed857ec1fd89b0c4be401a0",
              "file_hash": null
            },
            "cursor": "528993700537de13113"
          },
...          
          {
            "node": {
              "workchain_id": 0,
              "id": "block/c66528d454dc621ca9b6e6f48889e4da87c160bcdf5e05263b7e390aa5e035a3",
              "shard": "6800000000000000",
              "seq_no": 3664899,
              "hash": "c66528d454dc621ca9b6e6f48889e4da87c160bcdf5e05263b7e390aa5e035a3",
              "file_hash": null
            },
            "cursor": "528993700537ec03116"
          }
        ],
        "pageInfo": {
          "endCursor": "528993700537ec03116",
          "hasNextPage": true
        }
      }
    }
  }
}
```

`hasNextPage` returned `true`, so the next page exists and we should continue paginating within the same `seq_no` range.

If it is `false`, to continue pagination without losing any blocks, we can simply move the `seq_no` range forward.

**Note**: To implement backward pagination use `pageInfo.hasPreviousPage`

The full documentation about blocks pagination is available [here](https://docs.evercloud.dev/samples/graphql-samples/blocks#blocks-pagination).

## Transactions pagination with Blockchain API

Transaction pagination works exactly the same as block pagination - transactions are listed via cursor within a specified masterchain block `seq_no` range.

The following sample paginates workchain 0 transactions in a given `master_seq_no_range`:

```graphql
 query{
  blockchain{
      transactions(
        master_seq_no_range: {
          start: 2660661
          end: 2670661
      }
          workchain:0
      ){
        edges{
          node{
            id
            now
          }
          cursor
        }
        pageInfo{
          endCursor
          hasNextPage
        }
      }
  }
}
```

`PageInfo.hasNextPage` checks if there is additional data available in the `seq_no` range to form a next page. 

If it returns `false`, `seq_no` range should be moved forward to get the next batch of transactions.

To implement backward pagination use `pageInfo.hasPreviousPage`

The result of the sample above looks like this:

```graphql
{
  "data": {
    "blockchain": {
      "transactions": {
        "edges": [
          {
            "node": {
              "id": "transaction/e15b27cf27e34ea4f207d06b6bb8c1541626200fea6cc00be23e10efec49bd2a",
              "now": 1598767530
            },
            "cursor": "528ad6800538067c11f00"
          },
...
          {
            "node": {
              "id": "transaction/d95894791b0cdcaab0988de272fa620a4c456df865e0a79b4eab94fa2bcd2840",
              "now": 1598782332
            },
            "cursor": "528be5b005381da811c00"
          }
        ],
        "pageInfo": {
          "endCursor": "528be5b005381da811c00",
          "hasNextPage": true
        }
      }
    }
  }
}
```

Use `cursor`, {`first`, `after`} or {`last`, `before`} filters to get neighboring pages of the same `seq_no` range:

- `after/first` - shows `first` number of items `after` (not including) specified cursor value.
- `before/last`- shows `last` number of items `before` (not including) specified cursor value.

```graphql
 query{
  blockchain{
      transactions(
        master_seq_no_range: {
          start: 2660661
          end: 2670661
      }
          after:"528be5b005381da811c00"
          first:10
          workchain:0
      ){
        edges{
          node{
            id
            now
          }
          cursor
        }
        pageInfo{
          endCursor
          hasNextPage
        }
      }
  }
}
```

The full documentation about transaction pagination is available [here](https://docs.evercloud.dev/samples/graphql-samples/transactions#paginate-blockchain-transactions).

## Getting block `seq_no` range by time range

If you do not know the `seq_no` of masterchain blocks to create a range you can first obtain it by the time range, and then implement pagination the same way as described above.

Use the following query:

```graphql
query{
  blockchain{
    master_seq_no_range(time_start: 1685166198 time_end: 1685266198){
      start
      end
    }
  }
}
```

Here `time_start` and `time_end` indicate the time range for which you will get the block master `seq_no` range.

The output of the query looks like this:

```graphql
{
  "data": {
    "blockchain": {
      "master_seq_no_range": {
        "start": 28233606,
        "end": 28266974
      }
    }
  }
}
```

**Warning: Specifying a timestamp range does not guarantee that there will be no blocks outside of that range in the result set. This is because some thread blocks generated outside of the specified time range may be committed to a masterchain block generated within that time range. However, this pagination method allows us to conveniently retrieve all blocks/transactions. Neighboring ranges may be checked for blocks and transactions that might have escaped the result set.**

## Query Collection Comparison

***Note**: This is the How Not To Do It section.*

A typical way to query blocks collection in GraphQL looks like this:

```graphql
  query{
		blocks(
			filter: {
				gen_utime: {lt: 1686215295} 
				workchain_id: {eq : 0} 
			} 
			limit: 50 
			orderBy: {path:"gen_utime",direction:DESC}
		) 
		{ 
		workchain_id
		id
		shard
		seq_no
		file_hash
		}
}

```

Here block selection happens by generation unixtime (`gen_utime`).

And this is the typical way to query transactions:

```graphql
query {
  transactions(
    filter: {
      now: {gt: 1567601735}
    }
    orderBy: {path:"now",direction:DESC}
    limit :5
  )
  {
    id
    now
  }
}
```

Here transactions are filtered by `now` timestamp.

If this is used for pagination and high or varied blockchain load occurs (shards split and merge intensively), blocks and transactions selected by time may end up lost - just as when getting master `seq_no` by timestamp in the section above, some thread blocks generated within that timestamp may not be included in the results.

**There is however no reliable way to check for these lost blocks/transactions and ensure they are retrieved, so this method should never be used for any tasks that require data completeness.**

Its primary use is analytics tasks.