CREATE TABLE [dbo].[CardFavourite] (
    [CardFavourite_PK] INT IDENTITY (1, 1) NOT NULL,
    [Card_FK]          INT NOT NULL,
    [User_FK]          INT NOT NULL,
    CONSTRAINT [PK_CardFavourite] PRIMARY KEY CLUSTERED ([CardFavourite_PK] ASC),
    CONSTRAINT [FK_CardFavourite_Card_FK] FOREIGN KEY ([Card_FK]) REFERENCES [dbo].[Card] ([Card_PK]),
    CONSTRAINT [FK_CardFavourite_User_FK] FOREIGN KEY ([User_FK]) REFERENCES [dbo].[User] ([User_PK])
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [UX_CardFavourite_Card_FK_User_FK]
    ON [dbo].[CardFavourite]([Card_FK] ASC, [User_FK] ASC);

