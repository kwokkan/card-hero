CREATE TABLE [dbo].[CardCollection] (
    [CardCollection_PK] INT           IDENTITY (10000, 1) NOT NULL,
    [Rowstamp]          ROWVERSION    NOT NULL,
    [Card_FK]           INT           NOT NULL,
    [User_FK]           INT           NOT NULL,
    [CreatedTime]       DATETIME2 (7) DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_CardCollection] PRIMARY KEY CLUSTERED ([CardCollection_PK] ASC),
    CONSTRAINT [FK_CardCollection_Card_FK] FOREIGN KEY ([Card_FK]) REFERENCES [dbo].[Card] ([Card_PK]),
    CONSTRAINT [FK_CardCollection_User_FK] FOREIGN KEY ([User_FK]) REFERENCES [dbo].[User] ([User_PK])
);


GO
CREATE NONCLUSTERED INDEX [IX_CardCollection_User_FK]
    ON [dbo].[CardCollection]([User_FK] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_CardCollection_Card_FK]
    ON [dbo].[CardCollection]([Card_FK] ASC);

