
## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|string|null:false, add_index|
|password|string|null:false|

### Association
- has_many :groups_users
- has_many :groups, throuth: :groups_users


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|group_name|string|null:false ,add_index|


### Association
- has_many :groups_users
- has_many :users, throuth: :groups_users


## Massageテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|body|text||
|image|string||
|group_id|integer|null:false,foreign_key: true|
|user_id|integer|null:false,foreign_key: true|



### Association
- belongs_to :group
- belongs_to :user