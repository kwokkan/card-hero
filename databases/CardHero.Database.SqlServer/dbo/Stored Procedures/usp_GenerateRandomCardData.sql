create procedure [dbo].[usp_GenerateRandomCardData]
	@min int = 1,
	@max int = 10
as
	declare @cardPk int

	declare card_cursor cursor for
	select c.Card_PK
	from dbo.Card c

	open card_cursor

	while 1 = 1
	begin

		fetch next from card_cursor
		into @cardPk

		if @@fetch_status <> 0
			break;

		update dbo.Card
		set
			UpAttack = rand() * (@max - @min) + @min,
			RightAttack = rand() * (@max - @min) + @min,
			DownAttack = rand() * (@max - @min) + @min,
			LeftAttack = rand() * (@max - @min) + @min,
			Health = rand() * (@max - @min) + @min,
			Attack = rand() * (@max - @min) + @min,
			Defence = rand() * (@max - @min) + @min
		where Card_PK = @cardPk

	end

	close card_cursor
	deallocate card_cursor

	return 0
