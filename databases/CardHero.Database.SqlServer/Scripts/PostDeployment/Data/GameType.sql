print 'GameType.sql'
set identity_insert dbo.GameType on

merge into dbo.GameType as Target
using (values
	(1, 'Triple Triad', 'Classic Triple Triad game.')
) as Source (
	GameType_PK,
	Name,
	Description
)
on
	Target.GameType_PK = Source.GameType_PK

when matched then
	update set
		Target.Name = Source.Name,
		Target.Description = Source.Description

when not matched by Source then
	delete

when not matched by Target then
	insert (GameType_PK, Name, Description)
	values (Source.GameType_PK, Source.Name, Source.Description)
;

set identity_insert dbo.GameType off
