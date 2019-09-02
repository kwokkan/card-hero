print 'Deploying Data\Rarity.sql'

set identity_insert dbo.Rarity on

merge into dbo.Rarity as Target
using (values 
	(1, 'Common', 10),
	(2, 'Uncommon', 5),
	(3, 'Rare', 3),
	(4, 'Epic', 2),
	(5, 'Legendary', 1)
) as Source(Rarity_PK, Name, Frequency)
on Source.Rarity_PK = Target.Rarity_PK
when matched then
	update set
		Name = Source.Name,
		Frequency = Source.Frequency
when not matched by Target then
	insert (Rarity_PK, Name, Frequency)
	values (Source.Rarity_PK, Source.Name, Source.Frequency)
when not matched by Source then
	delete
;

set identity_insert dbo.Rarity off

print 'Deployed Data\Rarity.sql'