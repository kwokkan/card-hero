CREATE TABLE [dbo].[DeckFavourite] (
    [DeckFavourite_PK] INT IDENTITY (1, 1) NOT NULL,
    [Deck_FK]          INT NOT NULL,
    [User_FK]          INT NOT NULL,
    CONSTRAINT [PK_DeckFavourite] PRIMARY KEY CLUSTERED ([DeckFavourite_PK] ASC),
    CONSTRAINT [FK_DeckFavourite_Deck_FK] FOREIGN KEY ([Deck_FK]) REFERENCES [dbo].[Deck] ([Deck_PK]),
    CONSTRAINT [FK_DeckFavourite_User_FK] FOREIGN KEY ([User_FK]) REFERENCES [dbo].[User] ([User_PK])
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_DeckFavourite_Deck_FK_User_FK]
    ON [dbo].[DeckFavourite]([Deck_FK] ASC, [User_FK] ASC);

