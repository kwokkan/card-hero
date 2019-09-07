CREATE TABLE [dbo].[GameUser] (
    [GameUser_PK] INT        IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]    ROWVERSION NOT NULL,
    [Game_FK]     INT        NOT NULL,
    [User_FK]     INT        NOT NULL,
    [Order]       INT        NULL,
    CONSTRAINT [PK_GameUser] PRIMARY KEY CLUSTERED ([GameUser_PK] ASC),
    CONSTRAINT [FK_GameUser_Game] FOREIGN KEY ([Game_FK]) REFERENCES [dbo].[Game] ([Game_PK]),
    CONSTRAINT [FK_GameUser_User] FOREIGN KEY ([User_FK]) REFERENCES [dbo].[User] ([User_PK])
);


GO
CREATE NONCLUSTERED INDEX [IX_GameUser_User_FK]
    ON [dbo].[GameUser]([User_FK] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_GameUser_Game_FK]
    ON [dbo].[GameUser]([Game_FK] ASC);

