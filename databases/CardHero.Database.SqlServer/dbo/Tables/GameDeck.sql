CREATE TABLE [dbo].[GameDeck] (
    [GameDeck_PK] INT             IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]    ROWVERSION      NOT NULL,
    [Name]        NVARCHAR (100)  NULL,
    [Description] NVARCHAR (1000) NULL,
    [CreatedTime] DATETIME2 (7)   DEFAULT (getutcdate()) NOT NULL,
    [GameUser_FK] INT             NOT NULL,
    CONSTRAINT [PK_GameDeck] PRIMARY KEY CLUSTERED ([GameDeck_PK] ASC),
    CONSTRAINT [FK_GameDeck_GameUser_FK] FOREIGN KEY ([GameUser_FK]) REFERENCES [dbo].[GameUser] ([GameUser_PK])
);


GO
CREATE NONCLUSTERED INDEX [IX_GameDeck_GameUser_FK]
    ON [dbo].[GameDeck]([GameUser_FK] ASC);

