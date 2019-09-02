CREATE TABLE [dbo].[Rarity] (
    [Rarity_PK]   INT             IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]    ROWVERSION      NOT NULL,
    [Name]        NVARCHAR (100)  NOT NULL,
	[Frequency]   INT             NOT NULL,
    CONSTRAINT [PK_Rarity] PRIMARY KEY CLUSTERED ([Rarity_PK] ASC)
);

