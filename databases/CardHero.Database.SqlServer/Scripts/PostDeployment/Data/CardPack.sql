print 'CardPack.sql'
set identity_insert dbo.CardPack on

merge into dbo.CardPack as Target
using (values
	(1, 'Standard', 'Standard cards.')
) as Source (
	CardPack_PK,
	Name,
	Description
)
on
	Target.CardPack_PK = Source.CardPack_PK

when matched then
	update set
		Target.Name = Source.Name,
		Target.Description = Source.Description

when not matched by Source then
	delete

when not matched by Target then
	insert (CardPack_PK, Name, Description)
	values (Source.CardPack_PK, Source.Name, Source.Description)
;

set identity_insert dbo.CardPack off
