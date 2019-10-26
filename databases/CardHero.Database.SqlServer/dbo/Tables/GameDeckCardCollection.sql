CREATE TABLE [dbo].[GameDeckCardCollection] (
    [GameDeckCardCollection_PK] INT        IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]                  ROWVERSION NULL,
    [GameDeck_FK]               INT        NOT NULL,
    [Card_FK]                   INT        NOT NULL,
    CONSTRAINT [PK_GameDeckCardCollection] PRIMARY KEY CLUSTERED ([GameDeckCardCollection_PK] ASC),
    CONSTRAINT [FK_GameDeckCardCollection_Card_FK] FOREIGN KEY ([Card_FK]) REFERENCES [dbo].[Card] ([Card_PK]),
    CONSTRAINT [FK_GameDeckCardCollection_GameDeck_FK] FOREIGN KEY ([GameDeck_FK]) REFERENCES [dbo].[GameDeck] ([GameDeck_PK])
);


GO
CREATE NONCLUSTERED INDEX [IX_GameDeckCardCollection_Card_FK]
    ON [dbo].[GameDeckCardCollection]([Card_FK] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_GameDeckCardCollection_GameDeck_FK]
    ON [dbo].[GameDeckCardCollection]([GameDeck_FK] ASC);

