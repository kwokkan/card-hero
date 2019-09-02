CREATE TABLE [dbo].[DeckCardCollection] (
    [DeckCardCollection_PK] INT        IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]              ROWVERSION NULL,
    [Deck_FK]               INT        NOT NULL,
    [CardCollection_FK]     INT        NOT NULL,
    CONSTRAINT [PK_DeckCardCollection] PRIMARY KEY CLUSTERED ([DeckCardCollection_PK] ASC),
    CONSTRAINT [FK_DeckCardCollection_CardCollection_FK] FOREIGN KEY ([CardCollection_FK]) REFERENCES [dbo].[CardCollection] ([CardCollection_PK]),
    CONSTRAINT [FK_DeckCardCollection_Deck_FK] FOREIGN KEY ([Deck_FK]) REFERENCES [dbo].[Deck] ([Deck_PK])
);


GO
CREATE NONCLUSTERED INDEX [IX_DeckCardCollection_Deck_FK]
    ON [dbo].[DeckCardCollection]([Deck_FK] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_DeckCardCollection_CardCollection_FK]
    ON [dbo].[DeckCardCollection]([CardCollection_FK] ASC);

